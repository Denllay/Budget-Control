import firebase, { auth } from '@/firebase/config';
import { Dispatch } from 'react';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';

export const DeleteBudget = (budgetId: string) => {
  return (dispatch: Dispatch<TBudgetActions>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      firebase.database().ref(`users/${uid}/Budgets/${budgetId}`).remove();

      dispatch({ type: EnumBudgetAction.DELETE_BUDGET, payload: { budgetId } });
    } catch (error) {
      console.log(error);
    }
  };
};
