import React from 'react';
import styles from './BudgetItem.module.scss';
import { PieChart, Pie, Cell } from 'recharts';
import { DataGraph } from './DataGraph/DataGraph';
import { ICategoryData } from '../../../store/types/Budget/Budget';

interface IProps {
  data: ICategoryData[];
}
export const BudgetItem: React.FC<IProps> = ({ data }) => {
  const budgetSum = data.reduce((acc, el) => acc + el.value, 0);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title_item}>
        Budget <span>{budgetSum} RUB</span>
      </h2>
      <div className={styles.container}>
        <div className={styles.graph_block}>
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
          <DataGraph data={data} budgetSum={budgetSum} />
        </div>
      </div>
    </div>
  );
};
