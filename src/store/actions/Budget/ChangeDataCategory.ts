import firebase, { auth } from '@/firebase/config';
import { EnumBudgetAction } from '@/store/types/Budget/Budget';
import { ClearVolatileData } from '../VolatileBudget/ClearVolatileData';
import { ThunkDispatch } from 'redux-thunk';
import { TRootReducer } from '@/store/reducers';
import { Action } from 'redux';
interface IDataAction {
  budgetId: string;
  budgetIndex: number;
  categoryAvailableMoney: number;
  categoryMoney: number;
  categoryName: string;
  volatileCategoryId: string;
  categoryColor: string;
}

export const ChangeDataCategory = ({ budgetId, budgetIndex, categoryAvailableMoney, ...categoryData }: IDataAction) => {
  return async (dispatch: ThunkDispatch<TRootReducer, void, Action>) => {
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
