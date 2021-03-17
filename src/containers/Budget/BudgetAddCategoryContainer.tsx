import { BudgetAddCategory } from '@/components/Budgets/BudgetItem/BudgetItemBottomBlock/BudgetAddCategory/BudgetAddCategory';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { ICategoryFormatData } from '@/types/Budget/Budget';
import React, { useContext } from 'react';

export const BudgetAddCategoryContainer: React.FC = () => {
  const { category, budgetId, budgetIndex } = useContext(BudgetBlockContext);
  const { value, currency } = category.find(({ categoryId }) => categoryId === 'free') as ICategoryFormatData;
  return (
    <BudgetAddCategory
      valueCategoryFree={value}
      currencyCategoryFree={currency}
      budgetId={budgetId}
      budgetIndex={budgetIndex}
    />
  );
};
