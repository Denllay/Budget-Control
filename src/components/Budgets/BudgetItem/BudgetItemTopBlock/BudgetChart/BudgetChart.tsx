import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { ICategoryFormatData } from '@/types/Budget/Budget';
interface IProps {
  categoryData: ICategoryFormatData[];
}
export const BudgetChart: React.FC<IProps> = ({ categoryData }) => {
  return (
    <div>
      <PieChart width={300} height={300}>
        <Pie
          dataKey={'value'}
          stroke="none"
          data={categoryData}
          isAnimationActive={false}
          innerRadius={110}
          outerRadius={140}
          label={false}
          paddingAngle={1}
        >
          {categoryData.map(({ color, categoryId }) => (
            <Cell key={categoryId} fill={`${color}`} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};
