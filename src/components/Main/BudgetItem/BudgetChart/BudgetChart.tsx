import React from 'react';
import { ICategoryFormatData } from '@/store/types/Budget/Budget';
import { PieChart, Pie, Cell } from 'recharts';
interface IProps {
  data: ICategoryFormatData[];
}
export const BudgetChart: React.FC<IProps> = ({ data }) => {
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
            <Cell key={`cell-${index}`} fill={`#${color}`} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};
