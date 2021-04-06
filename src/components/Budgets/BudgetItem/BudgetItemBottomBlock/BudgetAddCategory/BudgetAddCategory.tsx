import React, { useState, memo, useRef } from 'react';
import { TCurrency } from '@/types/Budget/Budget';
import { useActions } from '@/hooks/useActions';
import { BudgetBottomForm } from '../BudgetBottomForm/BudgetBottomForm';
import { onSubmitFormBottomMenuFunction } from '@/types/Budget/BudgetBottomForm';
import styles from './BudgetAddCategory.module.scss';
interface IProps {
  availableMoneyCategory: number;
  budgetCurrency: TCurrency;
  budgetId: string;
  budgetIndex: number;
}

export const BudgetAddCategory: React.FC<IProps> = memo(
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
      <BudgetBottomForm
        availableMoneyCategory={availableMoneyCategory}
        budgetFormStatus="ADD"
        budgetCurrency={budgetCurrency}
        budgetId={budgetId}
        onSubmit={onSubmit}
      >
        <input type="submit" value="Add" className={styles.submit} />
      </BudgetBottomForm>
    );
  }
);
