import React, { memo, useContext } from 'react';
import { TCurrency } from '@/types/Budget/Budget';
import { useActions } from '@/hooks/useActions';
import { BottomForm } from '../BottomForm/BottomForm';
import { onSubmitFormBottomMenuFunction } from '@/types/Budget/BudgetBottomForm';
import styles from './AddCategory.module.scss';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';

const availableIdCategory = 'AvailableMoney';

export const AddCategory: React.FC = memo(() => {
  const { AddCategoryBudget } = useActions();

  const { category, budgetId, budgetIndex } = useContext(BudgetBlockContext);
  const { categoryMoney: availableMoneyCategory, categoryCurrency: budgetCurrency } = category.find(
    ({ categoryId }) => categoryId === availableIdCategory
  )!;

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
});
