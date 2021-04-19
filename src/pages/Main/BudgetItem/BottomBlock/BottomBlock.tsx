import React from 'react';
import { BudgetAddCategoryContainer } from '@/containers/Budget/BudgetAddCategoryContainer';
import { BudgetChangeCategoryContainer } from '@/containers/Budget/BudgetChangeCategoryContainer';
import { useTypedSelector } from '@/hooks/useTypedSelector';
interface IProps {
  budgetId: string;
}
export const BottomBlock: React.FC<IProps> = ({ budgetId }) => {
  const budgetChangeStatus = useTypedSelector(
    (state) => state?.volatileBudgets[budgetId]?.budgetIsChange || false
  );
  return budgetChangeStatus ? <BudgetChangeCategoryContainer /> : <BudgetAddCategoryContainer />;
};
