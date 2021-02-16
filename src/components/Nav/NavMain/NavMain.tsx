import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavMain.module.scss';
interface IProps {}
export const NavMain: React.FC<IProps> = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.list_item}>
        <Link to="/main">Main</Link>
      </li>
    </ul>
  );
};
