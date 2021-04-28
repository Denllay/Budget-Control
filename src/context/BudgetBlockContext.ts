import { createContext } from 'react';
type TBudgetBlockContext = {
  budgetIndex: number;
};
export const BudgetBlockContext = createContext({} as TBudgetBlockContext);
