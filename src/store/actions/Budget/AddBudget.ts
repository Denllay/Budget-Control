import { IBudgetFormatData, TCurrency } from '@/types/Budget/Budget';
import firebase, { auth } from '@/firebase/config';
import { Dispatch } from 'react';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';
interface IDataAction {
  title: string;
  money: number;
  currency: TCurrency;
}
export const AddBudget = ({ title, money, currency }: IDataAction) => {
  return (dispatch: Dispatch<TBudgetActions>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const budgetId = `id_${Math.random() * Date.now()}`.replace(/\./g, '');

      const categoryData = {
        categoryMoney: money,
        categoryCurrency: currency,
        categoryId: 'AvailableMoney',
        categoryColor: '#e4e4e4',
        categoryName: 'Available Money',
      };

      const budgetHeaderData = {
        title,
        currency,
        budgetSum: money,
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
          AvailableMoney: {
            ...categoryData,
          },
        },
      };
      firebase
        .database()
        .ref(`users/${uid}/BudgetsLength`)
        .transaction(function (value) {
          return (value || 0) + 1;
        });
      firebase.database().ref(`users/${uid}/Budgets/${budgetId}`).set(firebaseData);
      dispatch({ type: EnumBudgetAction.ADD_BUDGET, payload: budgetData });
    } catch (error) {
      console.log(error);
    }
  };
};
