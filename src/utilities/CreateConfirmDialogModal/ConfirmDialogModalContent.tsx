import React from 'react';
import { useRef } from 'react';
import { animated, useTransition, config } from 'react-spring';
import styles from './ConfirmDialogModal.module.scss';
interface IProps {
  modalStatus: boolean;
  onCloseModal(): void;
  onConfirmClick(): void;
  titleText: string;
}

export const ConfirmDialogModalContent: React.FC<IProps> = ({
  onCloseModal,
  modalStatus,
  onConfirmClick,
  titleText,
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
    const onClickConfirmHandler = () => {
      onConfirmClick();
      onCloseModal();
    };
    return (
      item && (
        <animated.div style={{ ...props, outline: 'none' }} ref={parentDiv} tabIndex={0}>
          <div
            className={styles.container}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <div className={styles.title}>
              <h2>{titleText}</h2>
            </div>
            <div className={styles.button_block}>
              <button className={styles.button} onClick={onClickConfirmHandler}>
                Yes
              </button>
              <button className={`${styles.button} ${styles.button_cancel}`} onClick={onCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </animated.div>
      )
    );
  });
};
