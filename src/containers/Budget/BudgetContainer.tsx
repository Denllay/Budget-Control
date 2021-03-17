import { Budgets } from '@/components/Budgets/Budgets';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import React from 'react';

export const BudgetContainer: React.FC = () => {
  const { budgetsData, budgetsLoadingStatus } = useTypedSelector((state) => state.budgets);
  return <Budgets budgetsData={budgetsData} budgetsLoadingStatus={budgetsLoadingStatus} />;
};
