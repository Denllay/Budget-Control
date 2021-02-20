import { GetDataBudget } from './GetDataBudget';
import { ICategoryData } from '../../types/Budget/Budget';
import firebase, { auth } from '../../../Firebase/config';
import { TCurrency } from '../../../types/Budget';
export const AddCategoryBudget = (
  budgetId: string,
  name: string,
  value: number,
  currency: TCurrency,
  freeCategory: ICategoryData
) => {
  return (dispatch) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const newBudgetCollectionRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category`).push();
      const data: ICategoryData = {
        color: (((1 << 24) * Math.random()) | 0).toString(16),
        currency,
        name,
        value,
      };

      firebase
        .database()
        .ref(`users/${uid}/Budgets/${budgetId}/category/free`)
        .set(freeCategory, (error) => {
          if (error) {
            console.log(error);
          }
        });

      newBudgetCollectionRef.set(data, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('sucsefful add');
        }
      });
      dispatch(GetDataBudget());
    } catch (error) {
      console.log(error);
    }
  };
};
