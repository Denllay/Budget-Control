import React from 'react';
import styles from './TopBlock.module.scss';
import { CategoryList } from './CategoryList/CategoryList';
import { BudgetChartContainer } from '@/containers/Budget/BudgetChartContainer';

export const BudgetItemTopBlock: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <BudgetChartContainer />
      <CategoryList />
    </div>
  );
};
