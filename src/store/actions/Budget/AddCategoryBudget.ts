import { GetDataBudget } from './GetDataBudget';
import { ICategoryData } from '../../types/Budget/Budget';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TRootReducer } from '../../reducers';
import firebase, { auth } from '@/Firebase/config';
import { EnumCurrency } from '@/types/Budget';
export const AddCategoryBudget = (
  budgetId: string,
  color: string,
  name: string,
  value: number,
  freeCategoryValue: number
) => {
  return (dispatch: ThunkDispatch<TRootReducer, void, Action>) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const newBudgetCollectionRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category`);
      const data: ICategoryData = {
        color: color !== '#c4c4c4' ? color : `#${(((1 << 24) * Math.random()) | 0).toString(16)}`,
        currency: EnumCurrency.RUB,
        name,
        value,
      };

      newBudgetCollectionRef.child('free/value').set(freeCategoryValue, (error) => {
        if (error) {
          console.log(error);
        }
      });

      newBudgetCollectionRef.push().set(data, (error) => {
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
