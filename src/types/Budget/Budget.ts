export const enum EnumCurrency {
  RUB = 'RUB',
  USD = 'USD',
}
export type TCurrency = EnumCurrency.RUB | EnumCurrency.USD;
export type TStatus = 'LOADING' | 'LOADED';

export interface IBudgetFormatData {
  budgetId: string;
  budgetSum: number;
  currency: TCurrency;
  category: ICategoryFormatData[];
  title: string;
}
export interface ICategoryFormatData {
  color: string;
  currency: TCurrency;
  name: string;
  value: number;
  categoryId: string;
}
export interface IBudgetItemDataStatus {
  isChange: boolean;
  categoryChangeId: null | string;
  inputValue: string;
  startValue: string;
}