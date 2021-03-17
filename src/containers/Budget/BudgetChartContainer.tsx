import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { BudgetChart } from '@/components/Budgets/BudgetItem/BudgetItemTopBlock/BudgetChart/BudgetChart';
import React, { useContext } from 'react';

export const BudgetChartContainer: React.FC = () => {
  const { category: categoryData } = useContext(BudgetBlockContext);
  return <BudgetChart categoryData={categoryData} />;
};
