import { Dispatch } from 'react';
import firebase, { auth } from '@/firebase/config';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';
interface IDataAction {
  newCategoryName: string;
  volatileCategoryId: string;
  budgetId: string;
  budgetIndex: number;
}
export const ChangeNameCategory = ({
  newCategoryName,
  volatileCategoryId,
  budgetId,
  budgetIndex,
}: IDataAction) => {
  return (dispatch: Dispatch<TBudgetActions>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      firebase
        .database()
        .ref(`users/${uid}/Budgets/${budgetId}/category/${volatileCategoryId}`)
        .update({ name: newCategoryName });
      dispatch({
        type: EnumBudgetAction.CHANGE_NAME_CATEGORY,
        payload: { budgetIndex, volatileCategoryId, newCategoryName },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
