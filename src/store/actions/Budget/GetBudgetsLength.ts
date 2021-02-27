import { Dispatch } from 'react';
import { EnumActionBudget, TBudgetAction } from '../../types/Budget/Budget';
import firebase, { auth } from '../../../Firebase/config';
export const GetBudgetsLength = () => {
  return async (dispatch: Dispatch<TBudgetAction>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      await firebase
        .database()
        .ref(`users/${uid}/Budgets`)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            dispatch({ type: EnumActionBudget.BUDGET_GET_LENGTH, payload: [snapshot.val()].length });
          } else {
            dispatch({ type: EnumActionBudget.BUDGET_GET_LENGTH, payload: 0 });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
};
