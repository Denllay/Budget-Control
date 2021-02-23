import React from 'react';
import styles from './NavLoader.module.scss';
interface IProps {}
export const NavLoader: React.FC<IProps> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};
