import { TVolatileBudgetAction, EnumVolatileBudgetAction } from '@/store/types/Budget/VolatileBudget';
import { Dispatch } from 'react';
interface IDataAction {
  budgetId: string;
  volatileInputValue: string;
}
export const ChangeVolatileInput = (data: IDataAction) => {
  return (dispatch: Dispatch<TVolatileBudgetAction>) =>
    dispatch({ type: EnumVolatileBudgetAction.CHANGE_VOLATILE_INPUT, payload: data });
};
