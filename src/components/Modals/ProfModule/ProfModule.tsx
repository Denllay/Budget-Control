import React, { useState } from 'react';
import styles from './ProfModule.module.scss';
import Modal from 'react-modal';
import { TProfileView } from './types/profileMainTypes';
import { ProfModuleShow } from './ProfModuleShow/ProfModuleShow';
import { ProfModuleSettings } from './ProfModuleSettings/ProfModuleSettings';
import { ProfileContext } from '@/context/ProfileContext';
import { auth } from '@/Firebase/config';
import { useActions } from '@/hooks/useActions';
interface IProps {
  statusModal: boolean;
}
export const ProfModule: React.FC<IProps> = ({ statusModal }) => {
  const [profileView, setProfileView] = useState<TProfileView>('view');
  const { CloseModal, SignOutAuth } = useActions();
  const onCloseModal = () => CloseModal();
  const onClickSignOut = () => {
    SignOutAuth();
    CloseModal();
  };
  const email = auth.currentUser && auth.currentUser.email;
  //
  const styleWidth = profileView === 'view' ? '140px' : '300px';
  const styleHeight = profileView === 'view' ? '' : '250px';
  //
  Modal.setAppElement('#root');
  return (
    <div className={styles.wrapper}>
      <Modal
        closeTimeoutMS={500}
        isOpen={statusModal}
        onRequestClose={onCloseModal}
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
            width: styleWidth,
            height: styleHeight,
            overflow: 'hidden',
            top: '10%',
            right: '1%',
            left: 'auto',
            bottom: 'auto',
            padding: '15px 0px 0px 0px',
            borderRadius: '5px 5px 5px 5px',
          },
        }}
      >
        {profileView === 'view' ? (
          <ProfModuleShow onClickSignOut={onClickSignOut} email={email} setProfileView={setProfileView} />
        ) : (
          <ProfileContext.Provider value={{ email, setProfileView, onCloseModal }}>
            <ProfModuleSettings profileView={profileView} />
          </ProfileContext.Provider>
        )}
      </Modal>
    </div>
  );
};
