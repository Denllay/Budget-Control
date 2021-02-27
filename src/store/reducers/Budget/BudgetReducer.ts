import { EnumActionBudget, EnumLoadBudgetAction, IBudgetInitialState, TBudgetAction } from '../../types/Budget/Budget';

const InitialState: IBudgetInitialState = {
  showAddMenu: false,
  budgets: null,
  loadStatus: EnumLoadBudgetAction.LOADING,
};
export const BudgetReducer = (state = InitialState, action: TBudgetAction) => {
  switch (action.type) {
    case EnumActionBudget.BUDGET_SHOW_ADD_MENU:
      return { ...state, showAddMenu: !state.showAddMenu };
    case EnumActionBudget.BUDGET_GET_DATA:
      return { ...state, budgets: action.payload, loadStatus: EnumLoadBudgetAction.LOADED };
    case EnumActionBudget.BUDGET_CLEAR_DATA:
      return { ...state, budgets: null };
    case EnumActionBudget.BUDGET_UPDATE_CURRENCY:
      return { ...state, currencyData: action.payload };
    case EnumActionBudget.BUDGET_GET_LENGTH:
      return { ...state, budgetsLength: action.payload };
    default:
      return { ...state };
  }
};
