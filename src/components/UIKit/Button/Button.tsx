import React from 'react';
import styles from './Button.module.scss';
interface IProps {
  className?: string;
  theme: 'green' | 'red' | 'dark';
  onClick?(): void;
  type?: 'submit' | 'button';
}
export const Button: React.FC<IProps> = ({ theme, onClick, className, children, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} className={`${styles[theme]} ${styles.button} ${className}`}>
      {children}
    </button>
  );
};
