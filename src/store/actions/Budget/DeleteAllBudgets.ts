import firebase, { auth } from '@/firebase/config';
import { Dispatch } from 'react';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';
export const DeleteAllBudgets = () => {
  return (dispatch: Dispatch<TBudgetActions>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      firebase.database().ref(`users/${uid}/Budgets/`).remove();
      dispatch({ type: EnumBudgetAction.DELETE_ALL_BUDGETS });
    } catch (error) {
      console.log(error);
    }
  };
};
