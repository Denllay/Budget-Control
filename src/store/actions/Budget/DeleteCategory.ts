import firebase, { auth } from '@/firebase/config';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';
import { Dispatch } from 'react';
interface IActionData {
  budgetId: string;
  categoryDeleteId: string;
  budgetIndex: number;
  availableMoneyCategory: number;
}
export const DeleteCategory = ({
  budgetId,
  categoryDeleteId,
  budgetIndex,
  availableMoneyCategory,
}: IActionData) => {
  return (dispatch: Dispatch<TBudgetActions>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const availableIdCategory = 'AvailableMoney';
      const deleteCategoryRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category`);
      deleteCategoryRef.child(availableIdCategory).update({ categoryMoney: availableMoneyCategory });

      firebase.database();
      deleteCategoryRef.child(categoryDeleteId).remove();
      dispatch({
        type: EnumBudgetAction.DELETE_CATEGORY,
        payload: { categoryDeleteId, budgetIndex, availableIdCategory, availableMoneyCategory },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
