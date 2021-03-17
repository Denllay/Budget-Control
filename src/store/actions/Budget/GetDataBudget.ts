import { Dispatch } from 'react';
import firebase, { auth } from '@/firebase/config';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';
import { IBudgetCategoryItemFromFirebase, IBudgetDataFromFirebase } from '@/store/types/Budget/BudgetGetData';
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
        });

      const formatData = !!data
        ? Object.entries(data).reduce((acc: IBudgetFormatData[], el: [string, IBudgetDataFromFirebase]) => {
            const [budgetId, { category, ...budgetHeaderData }] = el;
            const data: IBudgetFormatData = {
              ...budgetHeaderData,
              budgetId,
              category: Object.entries(category).reduce((acc: IBudgetCategoryItemFromFirebase[], [_, el]) => {
                acc.push(el);
                return acc;
              }, []),
            };

            acc.push(data);
            return acc;
          }, [])
        : [];

      dispath({ type: EnumBudgetAction.GET_DATA_BUDGET, payload: formatData });
    } catch (error) {
      console.log(error);
    }
  };
};
