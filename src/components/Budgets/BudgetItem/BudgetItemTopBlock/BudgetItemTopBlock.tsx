import React from 'react';
import { BudgetCategory } from './BudgetCategory/BudgetCategory';
import { BudgetChart } from './BudgetChart/BudgetChart';
import styles from './BudgetItemTopBlock.module.scss';
interface IProps {}
export const BudgetItemTopBlock: React.FC<IProps> = () => {
  return (
    <div className={styles.wrapper}>
      <BudgetChart />
      <BudgetCategory />
    </div>
  );
};
