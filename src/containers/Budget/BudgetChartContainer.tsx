import React, { useContext } from 'react';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { Chart } from '@/pages/Main/BudgetItem/TopBlock/Chart/Chart';

export const BudgetChartContainer: React.FC = () => {
  const { category: categoryData } = useContext(BudgetBlockContext);
  return <Chart categoryData={categoryData} />;
};
