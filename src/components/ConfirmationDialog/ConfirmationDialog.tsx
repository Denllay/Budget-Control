import React from 'react';
import styles from './confirmWindow.module.scss';
interface IProps {
  title: string;
}
export const ConfirmationDialog: React.FC<IProps> = ({ title }) => {
  return <div className={styles.wrapper}>{title}</div>;
};
// Later
