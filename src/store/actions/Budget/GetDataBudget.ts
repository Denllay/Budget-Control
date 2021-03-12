import { Dispatch } from 'react';
import firebase, { auth } from '@/firebase/config';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';
import { IBudgetCategoryItemDataFromFirebase, IBudgetDataFromFirebase } from '@/store/types/Budget/BudgetGetData';
import { IBudgetFormatData } from '@/types/Budget/Budget';
export const GetDataBudget = () => {
  return async (dispath: Dispatch<TBudgetActions>) => {
    /*
    ? В этом файле я получаю данные с базы данных(если они есть) и форматирую их в вид, с которым мне удобно работать и пихаю его в redux
    */
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const data: IBudgetDataFromFirebase = await firebase
        .database()
        .ref(`users/${uid}/Budgets`)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val();
          }
        })
        .catch((error) => {
          console.error(error);
        });

      const formatData = !!data
        ? Object.entries(data).reduce((acc: IBudgetFormatData[], el: [string, IBudgetDataFromFirebase]) => {
            const [budgetId, { currency, budgetSum, title, category }] = el;
            //
            const data: IBudgetFormatData = {
              budgetId,
              budgetSum,
              currency,
              title,
              category: Object.entries(category).reduce((acc: IBudgetCategoryItemDataFromFirebase[], [_, el]) => {
                acc.push(el);
                return acc;
              }, []),
            };
            ///
            acc.push(data);
            return acc;
          }, [])
        : [];
      //
      dispath({ type: EnumBudgetAction.GET_DATA_BUDGET, payload: formatData });
    } catch (error) {
      console.log(error);
    }
  };
};
