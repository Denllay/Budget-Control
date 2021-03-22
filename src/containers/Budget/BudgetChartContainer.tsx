import React, { useContext, useEffect } from 'react';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { BudgetChart } from '@/components/Budgets/BudgetItem/BudgetItemTopBlock/BudgetChart/BudgetChart';

export const BudgetChartContainer: React.FC = () => {
  const { category: categoryData } = useContext(BudgetBlockContext);
  useEffect(() => {
    console.log(categoryData);
  }, [categoryData]);
  return <BudgetChart categoryData={categoryData} />;
};
