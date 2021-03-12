import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TRootReducer } from '../../reducers';
import firebase, { auth } from '@/firebase/config';
import { GetDataBudget } from './GetDataBudget';
interface IActionData {
  budgetId: string;
  categoryId: string;
  freeCategoryValue: number;
}
export const DeleteCategory = ({ budgetId, categoryId, freeCategoryValue }: IActionData) => {
  return (dispatch: ThunkDispatch<TRootReducer, void, Action>) => {
    const uid = auth.currentUser && auth.currentUser.uid;
    const deleteCategoryRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category`);
    deleteCategoryRef.child('free/value').set(freeCategoryValue, (error) => error && console.log(error));

    firebase
      .database()
      .ref(`users/${uid}/Budgets/${budgetId}/category/${categoryId}`)
      .remove()
      .then(() => dispatch(GetDataBudget()))
      .catch((error) => console.log(error));
  };
};
