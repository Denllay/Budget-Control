import { Dispatch } from 'react';
import firebase, { auth } from '@/firebase/config';
import { EnumBudgetAction, TBudgetActions } from '@/store/types/Budget/Budget';
import {
  IBudgetCategoryItemFromFirebase,
  IBudgetDataFromFirebase,
  IBudgetListCategoryDataFromFirebase,
} from '@/store/types/Budget/BudgetGetData';
import { IBudgetFormatData, ICategoryFormatData } from '@/types/Budget/Budget';

type TBudgetItem = [string, IBudgetDataFromFirebase];

export const GetDataBudget = () => {
  return async (dispath: Dispatch<TBudgetActions>) => {
    try {
      const uid: Readonly<string | null> = auth.currentUser && auth.currentUser.uid;

      const data: IBudgetDataFromFirebase = await firebase
        .database()
        .ref(`users/${uid}/Budgets`)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) return snapshot.val();
        });

      const transformCategoryData = (category: IBudgetListCategoryDataFromFirebase): ICategoryFormatData[] =>
        Object.entries(category).reduce(
          (acc: IBudgetCategoryItemFromFirebase[], [_, el]) => [...acc, el],
          []
        );

      const createFormattedBudgetData = (budgetItem: TBudgetItem): IBudgetFormatData => {
        const [budgetId, { category: categoryData, ...budgetHeaderData }] = budgetItem;

        return {
          ...budgetHeaderData,
          budgetId,
          category: transformCategoryData(categoryData),
        };
      };

      const transformBudgetsData = (): IBudgetFormatData[] | never[] => {
        if (!data) return [];

        return Object.entries(data).reduce((acc: IBudgetFormatData[], BudgetItem: TBudgetItem) => {
          acc.push(createFormattedBudgetData(BudgetItem));
          return acc;
        }, []);
      };

      const formatData = transformBudgetsData();

      dispath({ type: EnumBudgetAction.GET_DATA_BUDGET, payload: formatData });
    } catch (error) {
      console.log(error);
    }
  };
};
