import { Dispatch } from 'react';
import firebase, { auth } from '@/firebase/config';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';
import { ClearVolatileData } from '../VolatileBudget/ClearVolatileData';
interface IDataAction {
  budgetId: string;
  budgetIndex: number;
  categoryAvailableMoney: number;
  categoryMoney: number;
  categoryName: string;
  volatileCategoryId: string;
  categoryColor: string;
}

export const ChangeDataCategory = ({
  budgetId,
  budgetIndex,
  categoryAvailableMoney,
  ...categoryData
}: IDataAction) => {
  return async (dispatch: any) => {
    try {
      const availableIdCategory = 'AvailableMoney';
      const uid = auth.currentUser && auth.currentUser.uid;
      const budgetCategoryRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category/`);
      const { volatileCategoryId, categoryName, categoryMoney, categoryColor } = categoryData;

      await budgetCategoryRef.child(volatileCategoryId).update({
        categoryName: categoryName,
        categoryMoney: categoryMoney,
        categoryColor: categoryColor,
      });

      await budgetCategoryRef.child(availableIdCategory).update({ categoryMoney: categoryAvailableMoney });
      dispatch(ClearVolatileData(budgetId));
      dispatch({
        type: EnumBudgetAction.CHANGE_DATA_CATEGORY,
        payload: {
          budgetIndex,
          availableIdCategory,
          categoryAvailableMoney,
          ...categoryData,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
