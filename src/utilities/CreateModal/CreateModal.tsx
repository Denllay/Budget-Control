import React, { useState, useMemo } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { animated, useTransition } from 'react-spring';
import { ModalContent } from './ModalContent';
import styles from './CreateModal.module.scss';
import { IPropsModalComponent } from '@/types/Modal';

interface IProps {
  component: React.FC<IPropsModalComponent>;
  dataModal?: string;
}
export const CreateModal = ({ component, dataModal = '' }: IProps) => {
  const parentDiv = useRef(null);
  const [modalStatus, setModal] = useState(false);
  const el = useMemo(() => document.createElement('div'), []);

  const closeModal = () => setModal(false);
  const toggleModal = () => setModal((prev) => !prev);
  const removeParendDiv = () => {
    const modalDiv = el.parentNode;
    if (!modalStatus && modalDiv) modalDiv.removeChild(el);
  };

  const transitionModal = useTransition(modalStatus, {
    expires: 0,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 250 },
    onRest: () => removeParendDiv(),
  });

  useEffect(() => {
    if (modalStatus) {
      document.body.appendChild(el);
    }
  }, [modalStatus, el]);

  const ModalComponent = transitionModal((props, item) => {
    return (
      item && (
        <>
          {createPortal(
            <animated.div style={props} ref={parentDiv} tabIndex={0}>
              <div className={styles.modal_wrapper} onClick={closeModal}>
                <ModalContent
                  modalStatus={modalStatus}
                  closeModal={closeModal}
                  component={component}
                  dataModal={dataModal}
                />
              </div>
            </animated.div>,
            el
          )}
        </>
      )
    );
  });

  return {
    toggleModal,
    ModalComponent,
  };
};
