import React, { useEffect, memo } from 'react';
import { useActions } from '@/hooks/useActions';
import { BudgetItem } from './BudgetItem/BudgetItem';
import { PreLoader } from '../PreLoader/PreLoader';
import { IBudgetFormatData, TBudgetLoadingStatus } from '@/types/Budget/Budget';
import styles from './Budgets.module.scss';
interface IProps {
  budgetsData: IBudgetFormatData[];
  budgetsLoadingStatus: TBudgetLoadingStatus;
}
export const Budgets: React.FC<IProps> = memo(({ budgetsData, budgetsLoadingStatus }) => {
  const { GetDataBudget } = useActions();
  const budgetItems = budgetsData.map((dataItem, index) => (
    <BudgetItem key={dataItem.budgetId} data={dataItem} budgetIndex={index} />
  ));
  const budgetList = budgetItems.length ? budgetItems : <h1 className={styles.title}>No budgets</h1>;

  useEffect(() => {
    GetDataBudget();
  }, [useActions]);
  return (
    <div className={styles.wrapper}>
      {budgetsLoadingStatus === 'LOADED' ? budgetList : <PreLoader preloaderStatus="budget" />}
    </div>
  );
});
