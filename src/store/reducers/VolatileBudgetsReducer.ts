import {
  IVolatileBudgetsData,
  TVolatileBudgetAction,
  EnumVolatileBudgetAction,
} from '../types/Budget/VolatileBudget';

const initialState: IVolatileBudgetsData = {};
export const VolatileBudgetsReducer = (
  state = initialState,
  action: TVolatileBudgetAction
): IVolatileBudgetsData => {
  switch (action.type) {
    case EnumVolatileBudgetAction.SET_VOLATILE_INITIAL_DATA: {
      const { volatileCategoryId, volatileInputValue, budgetId } = action.payload;
      return {
        ...state,
        [budgetId]: {
          budgetIsChange: true,
          volatileCategoryId,
          volatileInputValue,
          volatileInputStartValue: volatileInputValue,
        },
      };
    }
    case EnumVolatileBudgetAction.CLEAR_VOLATILE_DATA: {
      return {
        ...state,
        [action.payload]: {
          budgetIsChange: false,
          volatileCategoryId: null,
          volatileInputValue: null,
          volatileInputStartValue: null,
        },
      };
    }
    case EnumVolatileBudgetAction.CHANGE_VOLATILE_INPUT: {
      const { volatileInputValue, budgetId } = action.payload;
      return {
        ...state,
        [budgetId]: {
          ...state[budgetId],
          volatileInputValue,
        },
      };
    }

    default:
      return { ...state };
  }
};
