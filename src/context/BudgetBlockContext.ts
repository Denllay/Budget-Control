import { ICategoryFormatData } from '@/types/Budget/Budget';
import { createContext } from 'react';
type TBudgetBlockContext = {
  category: ICategoryFormatData[];
  budgetSum: number;
  budgetId: string;
};
export const BudgetBlockContext = createContext({} as TBudgetBlockContext);
