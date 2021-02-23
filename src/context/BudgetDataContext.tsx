import { SetStateAction, createContext, Dispatch } from 'react';
import { ICategoryFormatData } from '../store/types/Budget/Budget';
type TBudgetDataContext = {
  budgetId: string;
  data: ICategoryFormatData[];
};
export const BudgetDataContext = createContext({} as TBudgetDataContext);
