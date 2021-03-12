import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import React, { useContext, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

export const BudgetChart: React.FC = () => {
  const { category: data } = useContext(BudgetBlockContext);
  useEffect(() => {
    console.log('render');
  });
  return (
    <div>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          stroke="none"
          data={data}
          isAnimationActive={false}
          innerRadius={110}
          outerRadius={140}
          label={false}
          paddingAngle={1}
        >
          {data.map(({ color }, index) => (
            <Cell key={`cell-${index}`} fill={`${color}`} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};
