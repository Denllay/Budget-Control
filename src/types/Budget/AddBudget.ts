import { TCurrency } from './Budget';

export interface ICountNewCategoryMoneyConsideringCurrency {
  mainBudgetCurrency: TCurrency;
  newCategoryCurrency: TCurrency;
  newCategoryMoney: number;
}
export interface IDiscoverSucsessForm {
  newCategoryMoneyWithCountCurrency: number;
  newCategoryName: string;
}
export type TInputs = {
  nameCategory: string;
  valueCategory: string;
  currency: TCurrency;
};
