import { GetDataBudget } from './GetDataBudget';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TRootReducer } from '../../reducers';
import { EnumCurrency } from '@/types/Budget/Budget';
import firebase, { auth } from '@/firebase/config';
interface IDataAction {
  budgetId: string;
  name: string;
  value: number;
  valueFree: number;
  color: string;
}
export const AddCategoryBudget = ({ valueFree, budgetId, ...dataCategory }: IDataAction) => {
  return (dispatch: ThunkDispatch<TRootReducer, void, Action>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const newBudgetCollectionRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category`);
      const categoryId = `id_${Math.random() * Date.now()}`.replace(/\./gi, '');
      const data = {
        currency: EnumCurrency.RUB,
        categoryId,
        ...dataCategory,
      };

      newBudgetCollectionRef.child('free/value').set(valueFree, (error) => {
        if (error) {
          console.log(error);
        }
      });

      newBudgetCollectionRef.child(categoryId).set(data, (error) => {
        if (error) {
          console.log(error);
        } else {
          dispatch(GetDataBudget());
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};
