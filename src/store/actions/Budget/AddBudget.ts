import { IBudgetAddAction, IBudgetAddData } from '../../types/Budget/Budget';
import firebase, { auth } from '../../../Firebase/config';
import { GetDataBudget } from './GetDataBudget';
export const AddBudget = ({ title, value, currency }: IBudgetAddAction) => {
  /*
  ? Чтож тут у нас созается ячейка под определенный бюджет в баззу данных НИЧЕГО НЕ ТРОГАТЬ!
  */
  return (dispatch) => {
    const uid = auth.currentUser && auth.currentUser.uid;
    const budgetId = ('id-' + Math.abs(new Date().valueOf())).replace(/\./, '');
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
      .ref(`users/${uid}/Budgets/${budgetId}`)
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
