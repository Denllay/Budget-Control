import { Main } from '@/pages/Main/Main';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import React from 'react';

export const BudgetContainer: React.FC = () => {
  const { budgetsData, budgetsLoadingStatus } = useTypedSelector((state) => state.budgets);
  return <Main budgetsData={budgetsData} budgetsLoadingStatus={budgetsLoadingStatus} />;
};
