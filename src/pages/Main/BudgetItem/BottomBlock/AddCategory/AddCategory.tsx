import React, { memo } from 'react';
import { TCurrency } from '@/types/Budget/Budget';
import { useActions } from '@/hooks/useActions';
import { BottomForm } from '../BottomForm/BottomForm';
import { onSubmitFormBottomMenuFunction } from '@/types/Budget/BudgetBottomForm';
import styles from './AddCategory.module.scss';
interface IProps {
  availableMoneyCategory: number;
  budgetCurrency: TCurrency;
  budgetId: string;
  budgetIndex: number;
}

export const AddCategory: React.FC<IProps> = memo(
  ({ availableMoneyCategory, budgetCurrency, budgetId, budgetIndex }) => {
    const { AddCategoryBudget } = useActions();

    const onSubmit: onSubmitFormBottomMenuFunction = ({ categoryName, categoryMoney, categoryColor }) => {
      AddCategoryBudget({
        categoryColor,
        budgetId,
        budgetIndex,
        categoryName,
        categoryMoney: Math.round(categoryMoney),
        categoryAvailableMoney: Math.round(availableMoneyCategory - categoryMoney),
      });
    };
    return (
      <BottomForm
        availableMoneyCategory={availableMoneyCategory}
        budgetFormStatus="ADD"
        budgetCurrency={budgetCurrency}
        budgetId={budgetId}
        onSubmit={onSubmit}
      >
        <input type="submit" value="Add" className={styles.submit} />
      </BottomForm>
    );
  }
);
