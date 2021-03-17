import firebase, { auth } from '@/firebase/config';
import { Dispatch } from 'react';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';
import { EnumCurrency, ICategoryFormatData } from '@/types/Budget/Budget';
interface IDataAction {
  budgetId: string;
  name: string;
  value: number;
  freeCategoryValue: number;
  color: string;
  budgetIndex: number;
}
export const AddCategoryBudget = ({
  freeCategoryValue,
  budgetId,
  budgetIndex,
  ...dataCategory
}: IDataAction) => {
  return (dispatch: Dispatch<TBudgetActions>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const newBudgetCollectionRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category`);
      const categoryId = `id_${Math.random() * Date.now()}`.replace(/\./gi, '');

      const data: ICategoryFormatData = {
        currency: EnumCurrency.RUB,
        categoryId,
        ...dataCategory,
      };

      newBudgetCollectionRef.child('free').update({ value: freeCategoryValue });
      newBudgetCollectionRef.child(categoryId).set(data);

      dispatch({ type: EnumBudgetAction.ADD_CATEGORY, payload: { newCategoryData: data, budgetIndex } });
    } catch (error) {
      console.log(error);
    }
  };
};
