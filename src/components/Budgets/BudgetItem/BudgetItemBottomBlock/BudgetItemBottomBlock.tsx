import { useTypedSelector } from '@/hooks/useTypedSelector';
import React from 'react';
import { BudgetAddCategory } from './BudgetAddCategory/BudgetAddCategory';
import { BudgetChangeCategory } from './BudgetChangeCategory/BudgetChangeCategory';
interface IProps {
  budgetId: string;
}
export const BudgetItemBottomBlock: React.FC<IProps> = ({ budgetId }) => {
  const isChange = useTypedSelector((state) => state?.volatileBudgets[budgetId]?.budgetIsChange || null);
  return isChange ? <BudgetChangeCategory budgetId={budgetId} /> : <BudgetAddCategory />;
};
