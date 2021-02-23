import React, { useState } from 'react';
import styles from './BudgetItem.module.scss';
import { DataGraph } from './DataGraph/DataGraph';
import { ICategoryFormatData } from '../../../store/types/Budget/Budget';
import { BottomMenu } from './BottomMenu/BottomMenu';
import { BudgetChart } from './BudgetChart/BudgetChart';
import { BudgetDataContext } from '../../../context/BudgetDataContext';
interface IProps {
  data: ICategoryFormatData[];
  budgetId: string;
}
export const BudgetItem: React.FC<IProps> = ({ data, budgetId }) => {
  const budgetSum = data.reduce((acc, el) => acc + el.value, 0);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title_item}>
        Budget
        <span>
          {budgetSum} {data[0].currency}
        </span>
      </h2>
      <div className={styles.container}>
        <div className={styles.graph_block}>
          <BudgetChart data={data} />
          <BudgetDataContext.Provider value={{ budgetId, data }}>
            <DataGraph budgetSum={budgetSum} />
          </BudgetDataContext.Provider>
        </div>
        <BottomMenu data={data} budgetId={budgetId} />
      </div>
    </div>
  );
};
