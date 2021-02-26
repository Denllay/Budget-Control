import firebase, { auth } from '../../../Firebase/config';
import { GetDataBudget } from './GetDataBudget';
import { ThunkDispatch } from 'redux-thunk';
import { TRootReducer } from '../../reducers';
import { Action } from 'redux';
export const RemoveAllBudgets = () => {
  return (dispatch: ThunkDispatch<TRootReducer, void, Action>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      firebase
        .database()
        .ref(`users/${uid}/Budgets/`)
        .remove()
        .then(() => dispatch(GetDataBudget()))
        .catch((error) => console.log(error));
      console.log('all budgets has been deleted');
    } catch (error) {
      console.log(error);
    }
  };
};
