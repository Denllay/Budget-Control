import { TCurrency } from '@/types/Budget/Budget';
import { useCallback } from 'react';

interface IArgumentCountCategoryMoney {
  categoryCurrency: TCurrency;
  categoryMoney: number;
  budgetCurrency: TCurrency;
}
type countCategoryMoneyFunction = (data: IArgumentCountCategoryMoney) => number;

export const useCountMoneyConsideringCurrency = () => {
  const countMoneyConsideringCurrency: countCategoryMoneyFunction = useCallback(
    ({ categoryCurrency, categoryMoney, budgetCurrency }) => {
      if (categoryCurrency === budgetCurrency) return categoryMoney;

      const moneyListConsideringCurrency: Record<TCurrency, number> = {
        RUB: categoryMoney / 74,
        USD: categoryMoney * 74,
      };
      return moneyListConsideringCurrency[categoryCurrency];
    },
    []
  );

  return countMoneyConsideringCurrency;
};
