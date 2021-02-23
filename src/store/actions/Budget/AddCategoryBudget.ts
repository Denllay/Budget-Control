import { GetDataBudget } from './GetDataBudget';
import { ICategoryData } from '../../types/Budget/Budget';
import firebase, { auth } from '../../../Firebase/config';
import { TCurrency } from '../../../types/Budget';
export const AddCategoryBudget = (
  budgetId: string,
  name: string,
  value: number,
  currency: TCurrency,
  freeCategoryValue: number
) => {
  return (dispatch) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const newBudgetCollectionRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category`);
      const data: ICategoryData = {
        color: (((1 << 24) * Math.random()) | 0).toString(16),
        currency,
        name,
        value,
      };

      firebase.database();
      newBudgetCollectionRef.child('free/value').set(freeCategoryValue, (error) => {
        if (error) {
          console.log(error);
        }
      });

      newBudgetCollectionRef.push().set(data, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
        }
      });
      dispatch(GetDataBudget());
    } catch (error) {
      console.log(error);
    }
  };
};
