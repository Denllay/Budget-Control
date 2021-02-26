import { EnumModalAction, TModalAction } from '@/store/types/Modal/Modal';
import { Dispatch } from 'react';

export const ChangeViewAddBudgetModal = () => (dispatch: Dispatch<TModalAction>) =>
  dispatch({ type: EnumModalAction.SHOW_ADD_BUDGET_MODAL });
