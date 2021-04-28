import React from 'react';
import { ChangeCategory } from './ChangeCategory/ChangeCategory';
import { AddCategory } from './AddCategory/AddCategory';
import { useTypedSelector } from '@/hooks/useTypedSelector';
interface IProps {
  budgetId: string;
}
export const BottomBlock: React.FC<IProps> = ({ budgetId }) => {
  const budgetChangeStatus = useTypedSelector((state) => state?.volatile[budgetId]?.budgetIsChange || false);

  return budgetChangeStatus ? <ChangeCategory /> : <AddCategory />;
};
