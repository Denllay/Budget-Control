import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TRootReducer } from '../../reducers';
import { GetDataBudget } from './GetDataBudget';
import firebase, { auth } from '@/firebase/config';
interface IDataAction {
  name: string;
  categoryId: string;
  budgetId: string;
}
export const ChangeCategory = ({ name, categoryId, budgetId }: IDataAction) => {
  /*
  ? Чтож тут у нас созается ячейка под определенный бюджет в базу данных
  */
  return (dispatch: ThunkDispatch<TRootReducer, void, Action>) => {
    const uid = auth.currentUser && auth.currentUser.uid;
    firebase
      .database()
      .ref(`users/${uid}/Budgets/${budgetId}/category/${categoryId}`)
      .update({ name })
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
