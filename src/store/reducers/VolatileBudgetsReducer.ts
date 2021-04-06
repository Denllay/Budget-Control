import {
  TVolatileBudgetsData,
  TVolatileBudgetAction,
  EnumVolatileBudgetAction,
} from '../types/Budget/VolatileBudget';

const initialState: TVolatileBudgetsData = {};
export const VolatileBudgetsReducer = (
  state = initialState,
  action: TVolatileBudgetAction
): TVolatileBudgetsData => {
  switch (action.type) {
    case EnumVolatileBudgetAction.SET_VOLATILE_DATA: {
      const {
        volatileCategoryId,
        volatileCategoryName,
        volatileCategoryColor,
        volatileCategoryMoney,
        volatileCategoryCurrency,
        budgetId,
      } = action.payload;
      return {
        ...state,
        [budgetId]: {
          budgetIsChange: true,
          volatileCategoryName,
          volatileCategoryColor,
          volatileCategoryId,
          volatileCategoryMoney,
          volatileCategoryCurrency,
        },
      };
    }
    case EnumVolatileBudgetAction.CLEAR_VOLATILE_DATA: {
      return {
        ...state,
        [action.payload.budgetId]: {
          budgetIsChange: false,
          volatileCategoryId: '',
          volatileCategoryName: '',
          volatileCategoryColor: '',
          volatileCategoryCurrency: null,
          volatileCategoryMoney: 0,
        },
      };
    }
    default:
      return { ...state };
  }
};
