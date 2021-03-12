import React, { useEffect } from 'react';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IBudgetFormatData, TStatus } from '@/types/Budget/Budget';
import { BudgetItem } from './BudgetItem/BudgetItem';
import styles from './Budgets.module.scss';
import { PreLoader } from '../PreLoader/PreLoader';
interface IProps {}
export const Budgets: React.FC<IProps> = () => {
  const { GetDataBudget } = useActions();
  const {
    budgetItems: budgetItemsData,
    status,
  }: { budgetItems: IBudgetFormatData[]; status: TStatus } = useTypedSelector((state) => state?.budget || []);

  const budgetItems = budgetItemsData.map((dataItem) => (
    <BudgetItem key={dataItem.budgetId} data={dataItem} />
  ));
  const budget = budgetItems.length ? budgetItems : <h1 className={styles.title}>No budgets</h1>;

  useEffect(() => {
    GetDataBudget();
  }, [useActions]);
  useEffect(() => {
    console.log('render budgets');
  });
  return (
    <div className={styles.wrapper}>{status === 'LOADED' ? budget : <PreLoader statusStyle="budget" />}</div>
  );
};
