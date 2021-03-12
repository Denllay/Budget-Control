import React, { useState } from 'react';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { IBudgetFormatData, IBudgetItemDataStatus } from '@/types/Budget/Budget';
import { BudgetItemBottomBlock } from './BudgetItemBottomBlock/BudgetItemBottomBlock';
import { BudgetItemTopBlock } from './BudgetItemTopBlock/BudgetItemTopBlock';
import styles from './BudgetItem.module.scss';
interface IProps {
  data: IBudgetFormatData;
}
export const BudgetItem: React.FC<IProps> = ({ data }) => {
  const { budgetSum, title, category, budgetId, currency } = data;
  const [budgetStatus, setBudgetStatus] = useState<IBudgetItemDataStatus>({
    isChange: false,
    categoryChangeId: null,
    inputValue: '',
    startValue: '',
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <span>{`${title}: ${budgetSum} ${currency}`} </span>
      </div>
      <div className={styles.container}>
        <BudgetBlockContext.Provider value={{ category, budgetSum, budgetId, budgetStatus, setBudgetStatus }}>
          <BudgetItemTopBlock />
          <BudgetItemBottomBlock isChange={budgetStatus.isChange} />
        </BudgetBlockContext.Provider>
      </div>
    </div>
  );
};
