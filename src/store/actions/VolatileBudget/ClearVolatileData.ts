import { TVolatileBudgetAction, EnumVolatileBudgetAction } from '@/store/types/Budget/VolatileBudget';
import { Dispatch } from 'react';

export const ClearVolatileData = (budgetId: string) => {
  return (dispatch: Dispatch<TVolatileBudgetAction>) =>
    dispatch({ type: EnumVolatileBudgetAction.CLEAR_VOLATILE_DATA, payload: budgetId });
};
