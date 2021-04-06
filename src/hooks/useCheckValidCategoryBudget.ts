import { TCurrency } from '@/types/Budget/Budget';
import { useCallback } from 'react';

interface IArgumentCountCategoryMoney {
  currencyCategory: TCurrency;
  categoryMoney: number;
  budgetCurrency: TCurrency;
}
type countCategoryMoneyFunction = (data: IArgumentCountCategoryMoney) => number;

export const useCountCategoryMoneyConsideringCurrency = () => {
  const countCategoryMoneyConsideringCurrency: countCategoryMoneyFunction = useCallback(
    ({ currencyCategory, categoryMoney, budgetCurrency }) => {
      if (currencyCategory === budgetCurrency) return categoryMoney;
      return budgetCurrency === 'RUB' ? categoryMoney * 74 : categoryMoney / 74;
    },
    []
  );
  return {
    countCategoryMoneyConsideringCurrency,
  };
};
