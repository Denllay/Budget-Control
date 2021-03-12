import React from 'react';
import { BudgetAddCategory } from './BudgetAddCategory/BudgetAddCategory';
import { BudgetChangeCategory } from './BudgetChangeCategory/BudgetChangeCategory';
interface IProps {
  isChange: boolean;
}
export const BudgetItemBottomBlock: React.FC<IProps> = ({ isChange }) => {
  return isChange ? <BudgetChangeCategory /> : <BudgetAddCategory />;
};
