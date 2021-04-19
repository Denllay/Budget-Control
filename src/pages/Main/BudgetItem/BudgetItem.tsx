import React from 'react';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { IBudgetFormatData } from '@/types/Budget/Budget';
import { BottomBlock } from './BottomBlock/BottomBlock';
import { BudgetItemTopBlock } from './TopBlock/TopBlock';
import styles from './BudgetItem.module.scss';
interface IProps {
  data: IBudgetFormatData;
  budgetIndex: number;
}

export const BudgetItem: React.FC<IProps> = ({ data, budgetIndex }) => {
  const { budgetSum, title, category, budgetId, currency } = data;
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <span>{`${title}: ${budgetSum} ${currency}`} </span>
      </div>
      <div className={styles.container}>
        <BudgetBlockContext.Provider value={{ category, budgetSum, budgetId, budgetIndex }}>
          <BudgetItemTopBlock />
          <BottomBlock budgetId={budgetId} />
        </BudgetBlockContext.Provider>
      </div>
    </div>
  );
};