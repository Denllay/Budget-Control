import { Dispatch } from 'react';
import { EnumActionBudget, TBudgetAction } from '../../types/Budget/Budget';

export const ShowAddBudget = () => {
  return async (dispatch: Dispatch<TBudgetAction>) => {
    try {
      dispatch({ type: EnumActionBudget.BUDGET_SHOW_ADD_MENU });
    } catch (error) {
      console.log(error);
    }
  };
};
