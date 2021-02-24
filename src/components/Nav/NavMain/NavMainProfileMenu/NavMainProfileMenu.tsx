import React from 'react';
import styles from './NavMainProfileMenu.module.scss';
import Modal from 'react-modal';
interface IProps {
  profileMenu: boolean;
  onClickSignOut(): void;
  closeModalAuth(): void;
  email: string;
}
export const NavMainProfileMenu: React.FC<IProps> = ({ profileMenu, email, onClickSignOut, closeModalAuth }) => {
  Modal.setAppElement('#root');
  return (
    <div className={styles.wrapper}>
      <Modal
        closeTimeoutMS={500}
        isOpen={profileMenu}
        onRequestClose={closeModalAuth}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            zIndex: 100,
          },
          content: {
            border: 'none',
            width: '150px',
            overflow: 'hidden',
            top: '10%',
            right: '1%',
            left: 'auto',
            bottom: 'auto',
            padding: '15px 0px 0px 0px',
            borderRadius: '0px 0px 5px 5px',
          },
        }}
      >
        <div className={styles.info_profile_block}>
          <span className={styles.email}>{email}</span>
          <button onClick={onClickSignOut} className={styles.button_profile}>
            Sign Out
          </button>
        </div>
      </Modal>
    </div>
  );
};
