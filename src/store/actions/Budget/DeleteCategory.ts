import firebase, { auth } from '@/firebase/config';
import { AppDispatch, AppThunk } from '@/store';
import { budgetDeleteCategory } from '@/store/reducers/Budget';
interface IActionData {
  budgetId: string;
  categoryDeleteId: string;
  budgetIndex: number;
  availableMoneyCategory: number;
}

const availableIdCategory = 'AvailableMoney';

export const DeleteCategory = ({
  budgetId,
  categoryDeleteId,
  budgetIndex,
  availableMoneyCategory,
}: IActionData): AppThunk => (dispatch: AppDispatch) => {
  try {
    const uid = auth.currentUser && auth.currentUser.uid;
    const deleteCategoryRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category`);
    deleteCategoryRef.child(availableIdCategory).update({ categoryMoney: availableMoneyCategory });

    firebase.database();
    deleteCategoryRef.child(categoryDeleteId).remove();

    dispatch(budgetDeleteCategory({ categoryDeleteId, budgetIndex, availableMoneyCategory }));
  } catch (error) {
    console.log(error);
  }
};
