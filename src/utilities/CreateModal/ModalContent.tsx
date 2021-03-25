import { IPropsModalComponent } from '@/types/Modal';
import React from 'react';
import { useRef } from 'react';
import { animated, useTransition, config } from 'react-spring';

interface IProps {
  modalStatus: boolean;
  closeModal(): void;
  component: React.FC<IPropsModalComponent>;
  dataModal: string;
}

export const ModalContent: React.FC<IProps> = ({
  closeModal,
  modalStatus,
  component: Component,
  dataModal,
}) => {
  const parentDiv = useRef(null);
  const transitionContentModal = useTransition(modalStatus, {
    expires: 0,
    from: { transform: 'scale(1.2)' },
    enter: { transform: 'scale(1)' },
    leave: { transform: 'scale(0.8)' },
    config: config.gentle,
  });

  return transitionContentModal((props, item) => {
    return (
      item && (
        <animated.div style={{ ...props, outline: 'none' }} ref={parentDiv} tabIndex={0}>
          <Component closeModal={closeModal} dataModal={dataModal} />
        </animated.div>
      )
    );
  });
};
