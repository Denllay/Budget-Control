import React from 'react';
import styles from './TopBlock.module.scss';
import { CategoryList } from './CategoryList/CategoryList';
import { Chart } from './Chart/Chart';

export const BudgetItemTopBlock: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Chart />
      <CategoryList />
    </div>
  );
};
