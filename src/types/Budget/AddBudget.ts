import { TCurrency } from './Budget';

export interface ICountNewCategoryMoneyConsideringCurrency {
  newCategoryCurrency: TCurrency;
  newCategoryMoney: number;
}
export interface IDiscoverSucsessForm {
  newCategoryMoneyWithCountCurrency: number;
  newCategoryName: string;
}
export type TInputsCategory = {
  categoryName: string;
  categoryMoney: number;
  currencyCategory: TCurrency;
};
