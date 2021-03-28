import React from 'react';
import styles from './BudgetItemTopBlock.module.scss';
import { BudgetCategory } from './BudgetCategory/BudgetCategory';
import { BudgetChartContainer } from '@/containers/Budget/BudgetChartContainer';

export const BudgetItemTopBlock: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <BudgetChartContainer />
      <BudgetCategory />
    </div>
  );
};
