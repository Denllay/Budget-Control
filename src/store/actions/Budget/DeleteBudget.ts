import firebase, { auth } from '@/firebase/config';
import { GetDataBudget } from './GetDataBudget';
import { ThunkDispatch } from 'redux-thunk';
import { TRootReducer } from '../../reducers';
import { Action } from 'redux';
export const DeleteBudget = (budgetId: string) => {
  return (dispatch: ThunkDispatch<TRootReducer, void, Action>) => {
    const uid = auth.currentUser && auth.currentUser.uid;
    firebase
      .database()
      .ref(`users/${uid}/Budgets/${budgetId}`)
      .remove()
      .then(() => {
        dispatch(GetDataBudget());
      })
      .catch((error) => console.log(error));
  };
};
