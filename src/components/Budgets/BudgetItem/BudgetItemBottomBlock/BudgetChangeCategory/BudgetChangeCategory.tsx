import React, { useContext } from 'react';

import { useActions } from '@/hooks/useActions';
import styles from './BudgetChangeCategory.module.scss';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
interface IProps {
  budgetId: string;
}
export const BudgetChangeCategory: React.FC<IProps> = ({ budgetId }) => {
  const { ChangeNameCategory, ClearVolatileData } = useActions();
  const { budgetIndex } = useContext(BudgetBlockContext);
  const { volatileInputStartValue, volatileInputValue, volatileCategoryId } = useTypedSelector(
    (state) => state?.volatileBudgets[budgetId]
  );
  const clearBudgetVolatileData = () => ClearVolatileData(budgetId);

  const onConfirm = () => {
    if (volatileInputValue !== volatileInputStartValue && (volatileInputValue as string).length >= 3) {
      ChangeNameCategory({
        budgetId,
        volatileCategoryId: volatileCategoryId as string,
        newCategoryName: volatileInputValue as string,
        budgetIndex,
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
