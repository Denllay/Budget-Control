import React, { memo, useContext } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { useTypedSelector } from '@/hooks/useTypedSelector';

export const Chart = memo(() => {
  const { budgetIndex } = useContext(BudgetBlockContext);
  const { category } = useTypedSelector((state) => state.budgets.budgetsData[budgetIndex]);

  return (
    <>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="categoryMoney"
          stroke="none"
          data={category}
          isAnimationActive={false}
          innerRadius={110}
          outerRadius={140}
          label={false}
          paddingAngle={1}
        >
          {category.map(({ categoryColor, categoryId }) => (
            <Cell key={categoryId} fill={`${categoryColor}`} />
          ))}
        </Pie>
      </PieChart>
    </>
  );
});
