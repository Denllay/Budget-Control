import { TCurrency } from '@/types/Budget/Budget';
import { IBudgetListCategoryDataFromFirebase } from './BudgetGetData';
export interface IBudgetWithInitialData {
  title: string;
  budgetSum: number;
  currency: TCurrency;
  category: IBudgetListCategoryDataFromFirebase;
}
