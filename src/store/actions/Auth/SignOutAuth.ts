import { Dispatch } from 'react';
import { auth } from '../../../Firebase/config';
import { EnumAuthAction, TAuthAction } from '../../types/Auth/Auth';
import { EnumActionBudget, IBudgetClearData } from '../../types/Budget/Budget';

export const SignOutAuth = () => {
  return async (dispatch: Dispatch<TAuthAction | IBudgetClearData>) => {
    try {
      auth
        .signOut()
        .then(() => {
          dispatch({ type: EnumAuthAction.AUTH_LOGIN });
          dispatch({ type: EnumActionBudget.BUDGET_CLEAR_DATA });
        })
        .catch(console.log);
    } catch (error) {
      console.log(error);
    }
  };
};
