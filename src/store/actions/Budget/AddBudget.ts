import { IBudgetFormatData, TCurrency } from '@/types/Budget/Budget';
import firebase, { auth } from '@/firebase/config';
import { Dispatch } from 'react';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';
interface IDataAction {
  title: string;
  value: number;
  currency: TCurrency;
}
export const AddBudget = ({ title, value, currency }: IDataAction) => {
  /*
  ? Чтож тут у нас созается ячейка бюджета в базу данных
  */
  return (dispatch: Dispatch<TBudgetActions>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const budgetId = `id_${Math.random() * Date.now()}`.replace(/\./g, '');

      const categoryData = {
        value,
        currency,
        categoryId: 'free',
        color: '#e4e4e4',
        name: 'free',
      };

      const budgetHeaderData = {
        title,
        budgetSum: value,
        currency,
      };

      const budgetData: IBudgetFormatData = {
        ...budgetHeaderData,
        budgetId,
        category: [
          {
            ...categoryData,
          },
        ],
      };

      const firebaseData = {
        ...budgetHeaderData,
        category: {
          free: {
            ...categoryData,
          },
        },
      };

      firebase.database().ref(`users/${uid}/Budgets/${budgetId}`).set(firebaseData);
      dispatch({ type: EnumBudgetAction.ADD_BUDGET, payload: budgetData });
    } catch (error) {
      console.log(error);
    }
  };
};
