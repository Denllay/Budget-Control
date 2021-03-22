import React, { useContext } from 'react';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { BudgetCategoryItem } from '@/components/Budgets/BudgetItem/BudgetItemTopBlock/BudgetCategory/BudgetCategoryItem/BudgetCategoryItem';
import { ICategoryFormatData } from '@/types/Budget/Budget';
interface IProps {
  categoryData: ICategoryFormatData;
}
export const BudgetCategoryItemContainer: React.FC<IProps> = ({ categoryData }) => {
  const { budgetSum, budgetId } = useContext(BudgetBlockContext);
  const { budgetIsChange } = useTypedSelector((state) => state?.volatileBudgets[budgetId] || {});
  return (
    <BudgetCategoryItem budgetIsChange={budgetIsChange} budgetSum={budgetSum} categoryData={categoryData} />
  );
};
