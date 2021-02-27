import React, { useState, useEffect } from 'react';
import styles from './BudgetItem.module.scss';
import { DataGraph } from './DataGraph/DataGraph';
import { ICategoryFormatData } from '../../../store/types/Budget/Budget';
import { BottomMenu } from './BottomMenu/BottomMenu';
import { BudgetChart } from './BudgetChart/BudgetChart';
import { BudgetDataContext } from '../../../context/BudgetDataContext';
import { BudgetColorContext } from '@/context/BudgetColorContext';
interface IProps {
  data: ICategoryFormatData[];
  budgetId: string;
}
export const BudgetItem: React.FC<IProps> = ({ data, budgetId }) => {
  const [displayColor, setDisplayColor] = useState(false);
  const budgetSum = data.reduce((acc, el) => acc + el.value, 0);
  const onHiddenColorPicker = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLDivElement).dataset.id !== 'show_color_block' && setDisplayColor(false);
  };
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title_item}>
        Budget
        <span>
          {budgetSum} {data[data.length - 1].currency}
        </span>
      </h2>
      <div className={styles.container} onClick={onHiddenColorPicker}>
        <div className={styles.graph_block}>
          <BudgetChart data={data} />
          <BudgetDataContext.Provider value={{ budgetId, data }}>
            <DataGraph budgetSum={budgetSum} />
          </BudgetDataContext.Provider>
        </div>
        <BudgetColorContext.Provider value={{ displayColor, setDisplayColor }}>
          <BottomMenu data={data} budgetId={budgetId} />
        </BudgetColorContext.Provider>
      </div>
    </div>
  );
};
