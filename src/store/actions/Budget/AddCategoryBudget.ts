import firebase, { auth } from '@/firebase/config';
import { EnumCurrency, ICategoryFormatData } from '@/types/Budget/Budget';
import { AppDispatch, AppThunk } from '@/store';
import { budgetAddCategory } from '@/store/reducers/Budget';
interface IDataAction {
  budgetId: string;
  categoryName: string;
  categoryMoney: number;
  categoryAvailableMoney: number;
  categoryColor: string;
  budgetIndex: number;
}

const categoryAvaibleId = 'AvailableMoney';

export const AddCategoryBudget = ({
  categoryAvailableMoney,
  budgetId,
  budgetIndex,
  ...dataCategory
}: IDataAction): AppThunk => (dispatch: AppDispatch) => {
  try {
    const uid = auth.currentUser && auth.currentUser.uid;
    const newBudgetCollectionRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category`);
    const categoryId = `id_${Math.random() * Date.now()}`.replace(/\./gi, '');

    const data: ICategoryFormatData = {
      categoryCurrency: EnumCurrency.RUB,
      categoryId,
      ...dataCategory,
    };

    newBudgetCollectionRef.child(categoryAvaibleId).update({ categoryMoney: categoryAvailableMoney });
    newBudgetCollectionRef.child(categoryId).set(data);

    dispatch(budgetAddCategory({ categoryData: data, budgetIndex, categoryAvailableMoney }));
  } catch (error) {
    console.log(error);
  }
};
