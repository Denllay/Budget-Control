import { BudgetAddCategory } from '@/components/Budgets/BudgetItem/BudgetItemBottomBlock/BudgetAddCategory/BudgetAddCategory';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import React, { useContext } from 'react';

export const BudgetAddCategoryContainer: React.FC = () => {
  const availableIdCategory = 'AvailableMoney';
  const { category, budgetId, budgetIndex } = useContext(BudgetBlockContext);
  const { categoryMoney: availableMoneyCategory, categoryCurrency: budgetCurrency } = category.find(
    ({ categoryId }) => categoryId === availableIdCategory
  )!;

  return (
    <BudgetAddCategory
      availableMoneyCategory={availableMoneyCategory}
      budgetCurrency={budgetCurrency}
      budgetId={budgetId}
      budgetIndex={budgetIndex}
    />
  );
};
