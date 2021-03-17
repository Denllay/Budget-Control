import { TCurrency } from '@/types/Budget/Budget';

export interface IBudgetDataFromFirebase {
  budgetSum: number;
  currency: TCurrency;
  title: string;
  category: IBudgetListCategoryDataFromFirebase;
}
export interface IBudgetListCategoryDataFromFirebase {
  [key: string]: IBudgetCategoryItemFromFirebase;
}
export interface IBudgetCategoryItemFromFirebase {
  color: string;
  currency: TCurrency;
  name: string;
  value: number;
  categoryId: string;
}
