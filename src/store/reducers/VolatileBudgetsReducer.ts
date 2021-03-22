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
    case EnumVolatileBudgetAction.SET_VOLATILE_DATA: {
      const {
        volatileCategoryId,
        volatileCategoryValue,
        volatileCategoryColor,
        volatileCategoryMoney,
        budgetId,
      } = action.payload;
      return {
        ...state,
        [budgetId]: {
          budgetIsChange: true,
          volatileCategoryValue,
          volatileCategoryColor,
          volatileCategoryId,
          volatileCategoryMoney,
        },
      };
    }
    case EnumVolatileBudgetAction.CLEAR_VOLATILE_DATA: {
      return {
        ...state,
        [action.payload.budgetId]: {
          budgetIsChange: false,
          volatileCategoryId: '',
          volatileCategoryValue: '',
          volatileCategoryColor: '',
          volatileCategoryMoney: 0,
        },
      };
    }

    default:
      return { ...state };
  }
};
