import firebase, { auth } from '../../../Firebase/config';
import { GetDataBudget } from './GetDataBudget';

export const DeleteCategoryBudget = (budgetId: string, categoryId: string, freeCategoryValue: number) => {
  return (dispatch) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      const deleteCategoryRef = firebase.database().ref(`users/${uid}/Budgets/${budgetId}/category`);
      firebase.database();
      deleteCategoryRef.child('free/value').set(freeCategoryValue, (error) => {
        if (error) {
          console.log(error);
        }
      });

      firebase
        .database()
        .ref(`users/${uid}/Budgets/${budgetId}/category/${categoryId}`)
        .remove()
        .then(() => console.log('sucsess remove'))
        .catch((error) => console.log(error));
      dispatch(GetDataBudget());
    } catch (error) {
      console.log(error);
    }
  };
};
