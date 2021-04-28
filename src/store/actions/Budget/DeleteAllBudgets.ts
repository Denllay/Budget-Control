import firebase, { auth } from '@/firebase/config';
import { deleteAllBudgets } from '@/store/reducers/Budget';
import { AppDispatch, AppThunk } from '@/store';

export const DeleteAllBudgets = (): AppThunk => (dispatch: AppDispatch) => {
  try {
    const uid = auth.currentUser && auth.currentUser.uid;

    firebase.database().ref(`users/${uid}/Budgets/`).remove();
    firebase.database().ref(`users/${uid}/BudgetsLength`).set(0);

    dispatch(deleteAllBudgets());
  } catch (error) {
    console.log(error);
  }
};
