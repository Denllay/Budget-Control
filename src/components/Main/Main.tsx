import React from 'react';
import { useActions } from '../../hooks/useActions';
import styles from './Main.module.scss';
interface IProps {}
export const Main: React.FC<IProps> = () => {
  const { SignAuth } = useActions();
  return (
    <div className={styles.wrapper}>
      <button onClick={() => SignAuth()}>EXIT</button>
    </div>
  );
};
