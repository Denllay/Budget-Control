import { IBudgetAddAction, IBudgetAddData } from '../../types/Budget/Budget';
import firebase, { auth } from '../../../Firebase/config';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TRootReducer } from '../../reducers';
import { GetDataBudget } from './GetDataBudget';
export const AddBudget = ({ title, value, currency }: IBudgetAddAction) => {
  /*
  ? Чтож тут у нас созается ячейка под определенный бюджет в базу данных
  */
  return (dispatch: ThunkDispatch<TRootReducer, void, Action>) => {
    const uid = auth.currentUser && auth.currentUser.uid;
    const data: IBudgetAddData = {
      title,
      category: {
        free: {
          value,
          currency,
          color: 'e4e4e4',
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
