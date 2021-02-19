import { EnumActionBudget, IBudgetInitialState, TBudgetAction } from '../../types/Budget/Budget';

const InitialState: IBudgetInitialState = {
  showAddMenu: false,
};
export const BudgetReducer = (state = InitialState, action: TBudgetAction) => {
  switch (action.type) {
    case EnumActionBudget.BUDGET_SHOW_ADD_MENU:
      return { ...state, showAddMenu: !state.showAddMenu };
    case EnumActionBudget.BUDGET_GET_DATA:
      return { ...state, budgets: action.payload };
    case EnumActionBudget.BUDGET_CLEAR_DATA:
      return { ...state, budgets: undefined };
    default:
      return { ...state };
  }
};
