import React from 'react';
import styles from './ProfileStatistic.module.scss';
interface IProps {
  budgetsLength: number;
}
export const ProfileStatistic: React.FC<IProps> = ({ budgetsLength }) => {
  return (
    <ul className={styles.list}>
      <li className={styles.list_item}>
        <div>
          Password: <span> ***</span>
        </div>
      </li>
      <li className={styles.list_item}>
        <div>
          Budgets: <span>{budgetsLength}</span>
        </div>
      </li>
    </ul>
  );
};
