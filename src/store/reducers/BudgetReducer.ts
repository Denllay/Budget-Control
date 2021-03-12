import { EnumBudgetAction, IBudgetState, TBudgetActions } from '../types/Budget/Budget';

const initialState: IBudgetState = {
  status: 'LOADING',
  budgetItems: [],
};
export const BudgetReducer = (state = initialState, action: TBudgetActions): IBudgetState => {
  switch (action.type) {
    case EnumBudgetAction.GET_DATA_BUDGET: {
      return { ...state, budgetItems: action.payload, status: 'LOADED' };
    }
    default:
      return { ...state };
  }
};
