import { TCurrency } from '@/types/Budget/Budget';
import { TBudgetListCategoryDataFromFirebase } from './BudgetGetData';
export interface IBudgetWithInitialData {
  title: string;
  budgetSum: number;
  currency: TCurrency;
  category: TBudgetListCategoryDataFromFirebase;
}
