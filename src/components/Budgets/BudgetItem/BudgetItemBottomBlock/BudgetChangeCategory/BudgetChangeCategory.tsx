import React, { useContext } from 'react';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { useActions } from '@/hooks/useActions';
import styles from './BudgetChangeCategory.module.scss';

export const BudgetChangeCategory: React.FC = () => {
  const { setBudgetStatus, budgetId, budgetStatus } = useContext(BudgetBlockContext);
  const { inputValue, categoryChangeId, startValue } = budgetStatus;
  const { ChangeCategory } = useActions();

  const onClickCancel = () =>
    setBudgetStatus({ isChange: false, inputValue: '', startValue: '', categoryChangeId: null });

  const onConfirm = () => {
    if (inputValue !== startValue && inputValue.length >= 3) {
      ChangeCategory({ budgetId, categoryId: categoryChangeId as string, name: inputValue });
      setBudgetStatus({ ...budgetStatus, isChange: false });
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.button_block}>
        <button className={styles.button_item} onClick={onConfirm}>
          Confirm
        </button>
        <button className={`${styles.button_item} ${styles.button_cancel}`} onClick={onClickCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};
