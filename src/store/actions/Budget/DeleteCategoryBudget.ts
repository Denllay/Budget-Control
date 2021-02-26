import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TRootReducer } from '../../reducers';
import firebase, { auth } from '@/Firebase/config';
import { GetDataBudget } from './GetDataBudget';

export const DeleteCategoryBudget = (budgetId: string, categoryId: string, freeCategoryValue: number) => {
  return (dispatch: ThunkDispatch<TRootReducer, void, Action>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const deleteCategoryRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category`);
      firebase.database();
      deleteCategoryRef.child('free/value').set(freeCategoryValue, (error) => {
        if (error) {
          console.log(error);
        }
      });

      firebase
        .database()
        .ref(`users/${uid}/Budgets/${budgetId}/category/${categoryId}`)
        .remove()
        .then(() => dispatch(GetDataBudget()))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
};
