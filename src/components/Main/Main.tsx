import React, { useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AddBudgetModal } from './AddBudgetModal/AddBudgetModal';
import { BudgetItem } from './BudgetItem/BudgetItem';
import { PreLoaderBudget } from './PreLoaderBudget/PreLoaderBudget';
import styles from './Main.module.scss';
interface IProps {}
export const Main: React.FC<IProps> = () => {
  const budget = useTypedSelector((state) => state?.budget || []);
  const { GetDataBudget, GetCourseCurrencyBudget } = useActions();
  useEffect(() => {
    if (!budget.budgets) {
      console.log(budget);
      GetDataBudget();
    } else {
      console.log(budget);
    }
  }, [budget.budgets]);
  useEffect(() => {
    GetCourseCurrencyBudget();
  }, []);
  const graphBudgets = (budget.budgets &&
    budget.budgets.map(({ budgetId, category }) => {
      return <BudgetItem key={budgetId} data={category} budgetId={budgetId} />;
    })) || <h1 className={styles.title}>Add a new budget!</h1>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid_budget}>{budget.loadStatus === 'LOADING' ? <PreLoaderBudget /> : graphBudgets}</div>
      <AddBudgetModal statusModal={budget.showAddMenu} />
    </div>
  );
};
