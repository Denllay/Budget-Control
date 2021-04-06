export const enum EnumCurrency {
  RUB = 'RUB',
  USD = 'USD',
}
export type TCurrency = EnumCurrency.RUB | EnumCurrency.USD;
export type TBudgetLoadingStatus = 'LOADING' | 'LOADED';

export interface IBudgetFormatData {
  budgetId: string;
  budgetSum: number;
  currency: TCurrency;
  category: ICategoryFormatData[];
  title: string;
}
export interface ICategoryFormatData {
  categoryColor: string;
  categoryCurrency: TCurrency;
  categoryName: string;
  categoryMoney: number;
  categoryId: string;
}
