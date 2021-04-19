import React, { memo } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { ICategoryFormatData } from '@/types/Budget/Budget';
interface IProps {
  categoryData: ICategoryFormatData[];
}
export const Chart: React.FC<IProps> = memo(({ categoryData }) => {
  return (
    <div>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="categoryMoney"
          stroke="none"
          data={categoryData}
          isAnimationActive={false}
          innerRadius={110}
          outerRadius={140}
          label={false}
          paddingAngle={1}
        >
          {categoryData.map(({ categoryColor, categoryId }) => (
            <Cell key={categoryId} fill={`${categoryColor}`} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
});
