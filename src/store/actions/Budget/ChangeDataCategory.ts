import firebase, { auth } from '@/firebase/config';
import { ClearVolatileData } from '../VolatileBudget/ClearVolatileData';
import { AppDispatch, AppThunk } from '@/store';
import { budgetChangeCateogry } from '@/store/reducers/Budget';
interface IDataAction {
  budgetId: string;
  budgetIndex: number;
  categoryAvailableMoney: number;
  categoryMoney: number;
  categoryName: string;
  volatileCategoryId: string;
  categoryColor: string;
}

const availableIdCategory = 'AvailableMoney';

export const ChangeDataCategory = ({
  budgetId,
  budgetIndex,
  categoryAvailableMoney,
  ...categoryData
}: IDataAction): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const uid = auth.currentUser && auth.currentUser.uid;
    const budgetCategoryRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category/`);
    const { volatileCategoryId, categoryName, categoryMoney, categoryColor } = categoryData;

    await budgetCategoryRef.child(volatileCategoryId).update({
      categoryName: categoryName,
      categoryMoney: categoryMoney,
      categoryColor: categoryColor,
    });

    await budgetCategoryRef.child(availableIdCategory).update({ categoryMoney: categoryAvailableMoney });

    dispatch(ClearVolatileData(budgetId));
    dispatch(
      budgetChangeCateogry({
        budgetIndex,
        availableIdCategory,
        categoryAvailableMoney,
        ...categoryData,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
