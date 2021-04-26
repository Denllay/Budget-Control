import React from 'react';
import styles from './Title.module.scss';

interface IProps {
  style: React.CSSProperties;
}
export const Title: React.FC<IProps> = ({ children, style }) => {
  return (
    <span className={styles.span} style={style}>
      {children}
    </span>
  );
};
