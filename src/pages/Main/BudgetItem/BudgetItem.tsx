import React from 'react';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { IBudgetFormatData } from '@/types/Budget/Budget';
import { BottomBlock } from './BottomBlock/BottomBlock';
import { Title } from '@/components/UIKit';
import { BudgetItemTopBlock } from './TopBlock/TopBlock';
import styles from './BudgetItem.module.scss';
interface IProps {
  data: IBudgetFormatData;
  budgetIndex: number;
}
const titleStyle = {
  fontSize: '48px',
};
export const BudgetItem: React.FC<IProps> = ({ data, budgetIndex }) => {
  const { budgetSum, title, budgetId, currency } = data;
  return (
    <div className={styles.wrapper}>
      <Title style={titleStyle}>{`${title}: ${budgetSum} ${currency}`}</Title>

      <div className={styles.container}>
        <BudgetBlockContext.Provider value={{ budgetIndex }}>
          <BudgetItemTopBlock />
          <BottomBlock budgetId={budgetId} />
        </BudgetBlockContext.Provider>
      </div>
    </div>
  );
};
