import { Dispatch } from 'react';
import firebase, { auth } from '@/firebase/config';
import { EnumBudgetAction, TBudgetActions } from '../../types/Budget/Budget';

export const GetBudgetsLength = () => {
  return async (dispatch: Dispatch<TBudgetActions>) => {
    const uid: Readonly<string | null> = auth.currentUser && auth.currentUser.uid;
    const budgetsLength: number =
      (await firebase
        .database()
        .ref(`users/${uid}/BudgetsLength`)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) return snapshot.val();
        })) || 0;
    dispatch({ type: EnumBudgetAction.GET_LENGTH_BUDGET, payload: { budgetsLength } });
  };
};
