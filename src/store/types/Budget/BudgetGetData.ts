import { TCurrency } from '@/types/Budget/Budget';

export interface IBudgetDataFromFirebase {
  budgetSum: number;
  currency: TCurrency;
  title: string;
  category: IBudgetListCategoryDataFromFirebase;
}
export interface IBudgetListCategoryDataFromFirebase {
  [key: string]: IBudgetCategoryItemDataFromFirebase;
}
export interface IBudgetCategoryItemDataFromFirebase {
  color: string;
  currency: TCurrency;
  name: string;
  value: number;
  categoryId: string;
}
export type TBudgetItemDataFromFirebase = [string, IBudgetDataFromFirebase];
