import React, { Dispatch, SetStateAction } from 'react';
import { TProfileView } from '../types/profileMainTypes';
import styles from './ProfModuleShow.module.scss';
interface IProps {
  email: string;
  setProfileView: Dispatch<SetStateAction<TProfileView>>;
  onClickSignOut(): void;
}
export const ProfModuleShow: React.FC<IProps> = ({ email, setProfileView, onClickSignOut }) => {
  return (
    <div className={styles.info_profile_block}>
      <span className={styles.email}>{email}</span>
      <button className={styles.button_profile_settings} onClick={() => setProfileView('settings')}>
        Settings
      </button>
      <button onClick={onClickSignOut} className={styles.button_profile}>
        Sign Out
      </button>
    </div>
  );
};
