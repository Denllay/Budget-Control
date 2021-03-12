import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TRootReducer } from '../../reducers';
import { GetDataBudget } from './GetDataBudget';
import { TCurrency } from '@/types/Budget/Budget';
import firebase, { auth } from '@/firebase/config';
interface IDataAction {
  title: string;
  value: number;
  currency: TCurrency;
}
export const AddBudget = ({ title, value, currency }: IDataAction) => {
  /*
  ? Чтож тут у нас созается ячейка под определенный бюджет в базу данных
  */
  return (dispatch: ThunkDispatch<TRootReducer, void, Action>) => {
    const uid = auth.currentUser && auth.currentUser.uid;
    const data = {
      title,
      budgetSum: value,
      currency,
      category: {
        free: {
          value,
          currency,
          categoryId: 'free',
          color: '#e4e4e4',
          name: 'free',
        },
      },
    };

    firebase
      .database()
      .ref(`users/${uid}/Budgets/`)
      .push()
      .set(data)
      .then(() => {
        console.log('Saved Data'); // Change
      })
      .catch((error) => {
        console.log('Storing Error', error);
      });
    dispatch(GetDataBudget());
    try {
    } catch (error) {
      console.log(error);
    }
  };
};
