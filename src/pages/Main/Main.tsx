import React, { useEffect, memo } from 'react';
import { useActions } from '@/hooks/useActions';
import { BudgetItem } from './BudgetItem/BudgetItem';
import { PreLoader } from '../../components/PreLoader/PreLoader';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IBudgetFormatData } from '@/types/Budget/Budget';
import { Title } from '@/components/UIKit';
import styles from './Main.module.scss';

const titleStyle = {
  fontSize: '48px',
};
export const Main: React.FC = memo(() => {
  const { budgetsData, budgetsLoadingStatus } = useTypedSelector((state) => state.budgets);
  const { GetDataBudget } = useActions();

  useEffect(() => {
    GetDataBudget();
  }, [useActions]);

  const budgetItems = (budgetsData as IBudgetFormatData[]).map((dataItem, index) => (
    <BudgetItem key={dataItem.budgetId} data={dataItem} budgetIndex={index} />
  ));

  const budgetList = budgetItems.length ? budgetItems : <Title style={titleStyle}>No budgets</Title>;

  return (
    <div className={styles.wrapper}>
      {budgetsLoadingStatus === 'LOADED' ? budgetList : <PreLoader preloaderStatus="budget" />}
    </div>
  );
});
