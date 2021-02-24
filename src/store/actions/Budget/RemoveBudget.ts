import firebase, { auth } from '../../../Firebase/config';
import { GetDataBudget } from './GetDataBudget';
export const RemoveBudget = (budgetId: string) => {
  return (dispatch) => {
    try {
      const uid = auth.currentUser && auth.currentUser.uid;
      firebase
        .database()
        .ref(`users/${uid}/Budgets/${budgetId}`)
        .remove()
        .then(() => console.log('sucsess remove'))
        .catch((error) => console.log(error));
      dispatch(GetDataBudget());
    } catch (error) {
      console.log(error);
    }
  };
};
