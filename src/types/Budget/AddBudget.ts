import { TCurrency } from './Budget';

export interface ICountNewCategoryMoneyConsideringCurrency {
  newCategoryCurrency: TCurrency;
  newCategoryMoney: number;
}
export interface IDiscoverSucsessForm {
  newCategoryMoneyWithCountCurrency: number;
  newCategoryName: string;
}
export type TInputs = {
  newCategoryName: string;
  moneyCategory: string;
  currencyCategory: TCurrency;
};
