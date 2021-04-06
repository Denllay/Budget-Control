import React from 'react';
import { BudgetAddCategoryContainer } from '@/containers/Budget/BudgetAddCategoryContainer';
import { BudgetChangeCategoryContainer } from '@/containers/Budget/BudgetChangeCategoryContainer';
import { useTypedSelector } from '@/hooks/useTypedSelector';
interface IProps {
  budgetId: string;
}
export const BudgetItemBottomBlock: React.FC<IProps> = ({ budgetId }) => {
  const isChange = useTypedSelector((state) => state?.volatileBudgets[budgetId]?.budgetIsChange || false);
  return isChange ? <BudgetChangeCategoryContainer /> : <BudgetAddCategoryContainer />;
};
