import { Dispatch } from 'react';
import { EnumActionBudget, TBudgetAction } from '../../types/Budget/Budget';
import firebase, { auth } from '../../../Firebase/config';
export const GetDataBudget = () => {
  return async (dispath: Dispatch<TBudgetAction>) => {
    /*
    ? В этом гавно файле я получаю данные с базы данных(если они есть) и форматирую их в вид, с которым мне удобно работать и пихаю его в redux
    */
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const data = await firebase
        .database()
        .ref(`users/${uid}`)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val();
          } else {
            console.log('No data available'); //Change
          }
        })
        .catch((error) => {
          console.error(error);
        });

      if (!!data) {
        const formatData = Object.entries(data.Budgets).reduce((acc, el) => {
          const data = {
            title: el[1]['title'],
            budgetId: el[0],
            category: [],
          };
          Object.values(el[1]['category']).forEach((el) => data.category.push(el));
          acc.push(data);
          return acc;
        }, []);
        dispath({ type: EnumActionBudget.BUDGET_GET_DATA, payload: formatData });
      } else {
        dispath({ type: EnumActionBudget.BUDGET_GET_DATA, payload: null });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
