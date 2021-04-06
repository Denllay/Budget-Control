import firebase, { auth } from '@/firebase/config';
import { Dispatch } from 'react';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';
import { EnumCurrency, ICategoryFormatData } from '@/types/Budget/Budget';
interface IDataAction {
  budgetId: string;
  categoryName: string;
  categoryMoney: number;
  categoryAvailableMoney: number;
  categoryColor: string;
  budgetIndex: number;
}
export const AddCategoryBudget = ({
  categoryAvailableMoney,
  budgetId,
  budgetIndex,
  ...dataCategory
}: IDataAction) => {
  return (dispatch: Dispatch<TBudgetActions>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const newBudgetCollectionRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category`);
      const categoryId = `id_${Math.random() * Date.now()}`.replace(/\./gi, '');
      const categoryAvaibleId = 'AvailableMoney';
      const data: ICategoryFormatData = {
        categoryCurrency: EnumCurrency.RUB,
        categoryId,
        ...dataCategory,
      };

      newBudgetCollectionRef.child(categoryAvaibleId).update({ categoryMoney: categoryAvailableMoney });
      newBudgetCollectionRef.child(categoryId).set(data);
      dispatch({
        type: EnumBudgetAction.ADD_CATEGORY,
        payload: { categoryData: data, budgetIndex, categoryAvaibleId, categoryAvailableMoney },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
