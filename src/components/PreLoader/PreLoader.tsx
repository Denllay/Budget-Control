import React from 'react';
import styles from './PreLoader.module.scss';
interface IProps {
  preloaderStatus: 'budget' | 'nav';
}
export const PreLoader: React.FC<IProps> = ({ preloaderStatus }) => {
  return (
    <div className={styles[preloaderStatus]}>
      <div className={styles.loader}></div>
    </div>
  );
};
