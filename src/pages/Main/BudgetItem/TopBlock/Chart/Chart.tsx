import React, { memo, useContext } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { ICategoryFormatData } from '@/types/Budget/Budget';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';

export const Chart = memo(() => {
  const { category } = useContext(BudgetBlockContext);
  return (
    <div>
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
    </div>
  );
});
