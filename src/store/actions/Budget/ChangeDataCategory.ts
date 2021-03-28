import { Dispatch } from 'react';
import firebase, { auth } from '@/firebase/config';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';
interface IDataAction {
  budgetId: string;
  budgetIndex: number;
  newcategoryAvailableMoney: number;
  newCategoryData: INewCategoryData;
}
interface INewCategoryData {
  newCategoryMoney: number;
  newCategoryName: string;
  volatileCategoryId: string;
  newCategoryColor: string;
}
export const ChangeDataCategory = ({
  newCategoryData,
  budgetId,
  budgetIndex,
  newcategoryAvailableMoney,
}: IDataAction) => {
  return (dispatch: Dispatch<TBudgetActions>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const budgetCategoryRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category/`);
      const availableIdCategory = 'AvailableMoney';
      const { volatileCategoryId, newCategoryName, newCategoryMoney, newCategoryColor } = newCategoryData;

      budgetCategoryRef
        .child(volatileCategoryId)
        .update({ name: newCategoryName, value: newCategoryMoney, color: newCategoryColor });

      budgetCategoryRef.child(availableIdCategory).update({ value: newcategoryAvailableMoney });

      dispatch({
        type: EnumBudgetAction.CHANGE_DATA_CATEGORY,
        payload: {
          budgetIndex,
          volatileCategoryId,
          newCategoryName,
          newCategoryMoney,
          availableIdCategory,
          newcategoryAvailableMoney,
          newCategoryColor,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
