import React from 'react';
import { ICategoryData } from '../../../../store/types/Budget/Budget';
import styles from './DataGraph.module.scss';

interface IProps {
  data: ICategoryData[];
  budgetSum: number;
}
export const DataGraph: React.FC<IProps> = ({ data, budgetSum }) => {
  const procentValueData = budgetSum / 100;

  const dataItemsGraph = data.map(({ name, color, value }, index) => {
    const procent = (value / procentValueData).toFixed(1);
    const backgroundColorItem = { background: `#${color}` };
    const colorItem = { color: `#${color}` };
    return (
      <li className={styles.list_item} key={index}>
        <div className={styles.block_color}>
          <div className={styles.item_color} style={backgroundColorItem}></div>
          <span className={styles.item_name} style={colorItem}>
            {name}
          </span>
        </div>
        <span className={styles.procent_data} style={colorItem}>
          {procent}%
        </span>
      </li>
    );
  });
  return (
    <div className={styles.graph_data}>
      <ul className={styles.list}>{dataItemsGraph}</ul>
    </div>
  );
};
