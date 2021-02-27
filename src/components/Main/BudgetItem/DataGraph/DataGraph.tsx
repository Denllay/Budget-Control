import React, { useContext } from 'react';
import { BudgetDataContext } from '@/context/BudgetDataContext';
import { ChangeBlock } from './ChangeBlock/ChangeBlock';
import styles from './DataGraph.module.scss';

interface IProps {
  budgetSum: number;
}
export const DataGraph: React.FC<IProps> = ({ budgetSum }) => {
  const { data } = useContext(BudgetDataContext);
  const dataItemsGraph = data.map(({ name, color, value, categoryId }, index) => {
    const procent = (value / (budgetSum / 100)).toFixed(1);
    const backgroundColorItem = { background: `${color}` };
    const colorItem = { color: `${color}` };
    return (
      <li className={styles.list_item} key={index}>
        <div className={styles.block_color}>
          <div className={styles.item_color} style={backgroundColorItem}></div>
          <span className={styles.item_name} style={colorItem}>
            {name}
          </span>
        </div>
        <div className={styles.procent_block}>
          <span className={styles.procent_data} style={colorItem}>
            {procent}%
          </span>
          {categoryId !== 'free' && <ChangeBlock categoryId={categoryId} categoryValue={value} />}
        </div>
      </li>
    );
  });
  return (
    <div className={styles.graph_data}>
      <ul className={styles.list}>{dataItemsGraph}</ul>
    </div>
  );
};
