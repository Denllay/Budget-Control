import React, { useState, useMemo } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { animated, useTransition } from 'react-spring';
import { ConfirmDialogModalContent } from './ConfirmDialogModalContent';
import styles from './ConfirmDialogModal.module.scss';

interface IProps {
  onConfirmClick(): void;
  titleText: string;
}
export const CreateConfirmDialogModal = ({ onConfirmClick, titleText }: IProps) => {
  const parentDiv = useRef(null);
  const [modalStatus, setModal] = useState(false);
  const el = useMemo(() => document.createElement('div'), []);

  const onCloseModal = () => setModal(false);
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
    if (modalStatus) document.body.appendChild(el);
  }, [modalStatus, el]);

  const ConfirmDialogModal = transitionModal((props, item) => {
    return (
      item && (
        <>
          {createPortal(
            <animated.div style={props} ref={parentDiv} tabIndex={0}>
              <div className={styles.modal_wrapper} onClick={onCloseModal}>
                <ConfirmDialogModalContent
                  modalStatus={modalStatus}
                  onCloseModal={onCloseModal}
                  onConfirmClick={onConfirmClick}
                  titleText={titleText}
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
    ConfirmDialogModal,
  };
};
