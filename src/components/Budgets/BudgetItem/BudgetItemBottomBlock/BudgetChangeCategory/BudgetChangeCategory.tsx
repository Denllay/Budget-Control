import React from 'react';

import { useActions } from '@/hooks/useActions';
import styles from './BudgetChangeCategory.module.scss';
import { useTypedSelector } from '@/hooks/useTypedSelector';
interface IProps {
  budgetId: string;
}
export const BudgetChangeCategory: React.FC<IProps> = ({ budgetId }) => {
  const { ChangeNameCategory, ClearVolatileData } = useActions();
  const { volatileInputStartValue, volatileInputValue, volatileCategoryId } = useTypedSelector(
    (state) => state?.volatileBudgets[budgetId]
  );
  const clearBudgetVolatileData = () => ClearVolatileData(budgetId);

  const onConfirm = () => {
    if (volatileInputValue !== volatileInputStartValue && (volatileInputValue as string).length >= 3) {
      ChangeNameCategory({
        budgetId,
        categoryId: volatileCategoryId as string,
        name: volatileInputValue as string,
      });
      clearBudgetVolatileData();
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.button_block}>
        <button className={styles.button_item} onClick={onConfirm}>
          Confirm
        </button>
        <button className={`${styles.button_item} ${styles.button_cancel}`} onClick={clearBudgetVolatileData}>
          Cancel
        </button>
      </div>
    </div>
  );
};
