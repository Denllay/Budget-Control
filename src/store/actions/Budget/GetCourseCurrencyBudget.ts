import axios from 'axios';
import { Dispatch } from 'react';
import { ICurrencyData, EnumActionBudget, TBudgetAction } from '../../types/Budget/Budget';
export const GetCourseCurrencyBudget = () => {
  return async (dispatch: Dispatch<TBudgetAction>) => {
    try {
      if (!sessionStorage.getItem('currency')) {
        const { data } = await axios.get(`https://api.exchangeratesapi.io/latest?base=USD`);
        const { RUB }: { RUB: number } = data.rates;
        const currencyData: ICurrencyData = {
          RUB,
        };
        sessionStorage.setItem('currency', JSON.stringify(currencyData));
        dispatch({ type: EnumActionBudget.BUDGET_UPDATE_CURRENCY, payload: currencyData });
      } else {
        dispatch({
          type: EnumActionBudget.BUDGET_UPDATE_CURRENCY,
          payload: JSON.parse(sessionStorage.getItem('currency')),
        });
      }
    } catch (error) {}
  };
};
