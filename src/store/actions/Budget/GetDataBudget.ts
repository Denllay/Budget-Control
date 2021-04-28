import firebase, { auth } from '@/firebase/config';
import {
  IBudgetCategoryItemFromFirebase,
  IBudgetDataFromFirebase,
  TBudgetListCategoryDataFromFirebase,
} from '@/store/types/Budget/BudgetGetData';
import { IBudgetFormatData, ICategoryFormatData } from '@/types/Budget/Budget';
import { getDataBudgets } from '@/store/reducers/Budget';
import { AppDispatch, AppThunk } from '@/store';

type TBudgetItem = [string, IBudgetDataFromFirebase];

export const GetDataBudget = (): AppThunk => async (dispath: AppDispatch) => {
  try {
    const uid = auth.currentUser && auth.currentUser.uid;

    const data: IBudgetDataFromFirebase = await firebase
      .database()
      .ref(`users/${uid}/Budgets`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) return snapshot.val();
      });

    const transformBudgetsData = (): IBudgetFormatData[] | never[] => {
      if (!data) return [];

      return Object.entries(data).reduce((acc: IBudgetFormatData[], BudgetItem: TBudgetItem) => {
        acc.push(createFormattedBudgetData(BudgetItem));
        return acc;
      }, []);
    };

    const createFormattedBudgetData = (budgetItem: TBudgetItem): IBudgetFormatData => {
      const [budgetId, { category: categoryData, ...budgetHeaderData }] = budgetItem;

      return {
        ...budgetHeaderData,
        budgetId,
        category: transformCategoryData(categoryData),
      };
    };

    const transformCategoryData = (category: TBudgetListCategoryDataFromFirebase): ICategoryFormatData[] =>
      Object.entries(category).reduce((acc: IBudgetCategoryItemFromFirebase[], [_, el]) => {
        return [...acc, el];
      }, []);

    dispath(getDataBudgets(transformBudgetsData()));
  } catch (error) {
    console.log(error);
  }
};
