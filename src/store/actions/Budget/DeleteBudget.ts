import firebase, { auth } from '@/firebase/config';
import { AppDispatch, AppThunk } from '@/store';
import { deleteBudgetById } from '@/store/reducers/Budget';

export const DeleteBudget = (budgetId: string): AppThunk => (dispatch: AppDispatch) => {
  try {
    const uid = auth.currentUser && auth.currentUser.uid;

    firebase.database().ref(`users/${uid}/Budgets/${budgetId}`).remove();
    firebase
      .database()
      .ref(`users/${uid}/BudgetsLength`)
      .transaction(function (value) {
        return (value || 0) - 1;
      });

    dispatch(deleteBudgetById(budgetId));
  } catch (error) {
    console.log(error);
  }
};
