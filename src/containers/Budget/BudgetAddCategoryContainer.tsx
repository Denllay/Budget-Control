import { BudgetAddCategory } from '@/components/Budgets/BudgetItem/BudgetItemBottomBlock/BudgetAddCategory/BudgetAddCategory';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { ICategoryFormatData } from '@/types/Budget/Budget';
import React, { useContext } from 'react';

export const BudgetAddCategoryContainer: React.FC = () => {
  const { category, budgetId, budgetIndex } = useContext(BudgetBlockContext);
  const availableIdCategory = 'AvailableMoney';
  const { value, currency } = category.find(
    ({ categoryId }) => categoryId === availableIdCategory
  ) as ICategoryFormatData;
  return (
    <BudgetAddCategory
      availableMoneyCategory={value}
      mainBudgetCurrency={currency}
      budgetId={budgetId}
      budgetIndex={budgetIndex}
    />
  );
};
