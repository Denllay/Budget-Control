import { IBudgetFormatData, TCurrency } from '@/types/Budget/Budget';
import firebase, { auth } from '@/firebase/config';
import { addBudget } from '@/store/reducers/Budget';
import { AppDispatch, AppThunk } from '@/store';
interface IDataAction {
  title: string;
  money: number;
  currency: TCurrency;
}

export const AddBudget = ({ title, money, currency }: IDataAction): AppThunk => (dispatch: AppDispatch) => {
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

    dispatch(addBudget(budgetData));
  } catch (error) {
    console.log(error);
  }
};
