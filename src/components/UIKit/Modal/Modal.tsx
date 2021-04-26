import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { animated, useTransition } from 'react-spring';
import { ModalContent } from './ModalContent';
import styles from './Modal.module.scss';

interface IProps {
  modalStatus: boolean;
  setModalStatus: Dispatch<SetStateAction<boolean>>;
}
export const Modal: React.FC<IProps> = ({ children, setModalStatus, modalStatus }) => {
  const parentDiv = useRef(null);
  const el = useMemo(() => document.createElement('div'), []);

  const closeModal = () => {
    setModalStatus(false);
  };

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
    const onCloseModalKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalStatus(false);
      }
    };

    if (modalStatus) {
      document.body.appendChild(el);
      window.addEventListener('keydown', onCloseModalKeydown);
    }
    return () => {
      window.removeEventListener('keydown', onCloseModalKeydown);
    };
  }, [modalStatus, el]);

  const ModalComponent = transitionModal((props, item) => {
    return (
      item && (
        <>
          {createPortal(
            <animated.div style={props} ref={parentDiv} tabIndex={0}>
              <div className={styles.modal_wrapper} onClick={closeModal}>
                <ModalContent modalStatus={modalStatus}>{children}</ModalContent>
              </div>
            </animated.div>,
            el
          )}
        </>
      )
    );
  });

  return ModalComponent;
};
