import {
  TVolatileBudgetAction,
  ISetVolatileBudgetDataAction,
  EnumVolatileBudgetAction,
} from '@/store/types/Budget/VolatileBudget';
import { Dispatch } from 'react';

export const SetVolatileInitialData = (data: ISetVolatileBudgetDataAction) => {
  return (dispatch: Dispatch<TVolatileBudgetAction>) =>
    dispatch({ type: EnumVolatileBudgetAction.SET_VOLATILE_DATA, payload: data });
};
