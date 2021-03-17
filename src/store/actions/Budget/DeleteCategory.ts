import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TRootReducer } from '../../reducers';
import firebase, { auth } from '@/firebase/config';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';
import { Dispatch } from 'react';
interface IActionData {
  budgetId: string;
  categoryDeleteId: string;
  budgetIndex: number;
  categoryFreeValue: number;
}
export const DeleteCategory = ({
  budgetId,
  categoryDeleteId,
  budgetIndex,
  categoryFreeValue,
}: IActionData) => {
  return (dispatch: Dispatch<TBudgetActions>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const categoryFreeId = 'free';
      const deleteCategoryRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category`);
      deleteCategoryRef.child('free').update({ value: categoryFreeValue });

      firebase.database();
      deleteCategoryRef.child(`${categoryDeleteId}`).remove();
      dispatch({
        type: EnumBudgetAction.DELETE_CATEGORY,
        payload: { categoryDeleteId, budgetIndex, categoryFreeId, categoryFreeValue },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
