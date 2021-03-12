import { IBudgetItemDataStatus, ICategoryFormatData } from '@/types/Budget/Budget';
import { createContext, Dispatch, SetStateAction } from 'react';
type TBudgetBlockContext = {
  category: ICategoryFormatData[];
  budgetSum: number;
  budgetId: string;
  budgetStatus: IBudgetItemDataStatus;
  setBudgetStatus: Dispatch<SetStateAction<IBudgetItemDataStatus>>;
};
export const BudgetBlockContext = createContext({} as TBudgetBlockContext);
