import { TCurrency } from '@/types/Budget/Budget';

export interface IBudgetDataFromFirebase {
  budgetSum: number;
  currency: TCurrency;
  title: string;
  category: TBudgetListCategoryDataFromFirebase;
}
export type TBudgetListCategoryDataFromFirebase = Record<string, IBudgetCategoryItemFromFirebase>;
export interface IBudgetCategoryItemFromFirebase {
  categoryColor: string;
  categoryCurrency: TCurrency;
  categoryName: string;
  categoryMoney: number;
  categoryId: string;
}
