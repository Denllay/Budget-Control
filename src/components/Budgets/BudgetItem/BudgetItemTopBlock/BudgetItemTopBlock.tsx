import React from 'react';
import { BudgetChartContainer } from '@/containers/BudgetChartContainer';
import { BudgetCategory } from './BudgetCategory/BudgetCategory';
import styles from './BudgetItemTopBlock.module.scss';

export const BudgetItemTopBlock: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <BudgetChartContainer />
      <BudgetCategory />
    </div>
  );
};
