import firebase, { auth } from '@/firebase/config';
import { AppDispatch, AppThunk } from '@/store';
import { setLenghtBudgets } from '@/store/reducers/Budget';

export const GetBudgetsLength = (): AppThunk => async (dispatch: AppDispatch) => {
  const uid = auth.currentUser && auth.currentUser.uid;
  const budgetsLength: number =
    (await firebase
      .database()
      .ref(`users/${uid}/BudgetsLength`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) return snapshot.val();
      })) || 0;

  dispatch(setLenghtBudgets(budgetsLength));
};
