import { ICategoryFormatData } from '@/types/Budget/Budget';
import { EnumBudgetAction, IBudgetState, TBudgetActions } from '../types/Budget/Budget';

const initialState: IBudgetState = {
  budgetsLoadingStatus: 'LOADING',
  budgetsData: [],
};
export const BudgetReducer = (state = initialState, action: TBudgetActions): IBudgetState => {
  switch (action.type) {
    case EnumBudgetAction.GET_DATA_BUDGET: {
      return { ...state, budgetsData: action.payload, budgetsLoadingStatus: 'LOADED' };
    }

    case EnumBudgetAction.DELETE_BUDGET: {
      return {
        ...state,
        budgetsData: state.budgetsData.filter(({ budgetId }) => budgetId !== action.payload.budgetId),
      };
    }

    case EnumBudgetAction.ADD_BUDGET: {
      return {
        ...state,
        budgetsData: [...state.budgetsData, action.payload],
      };
    }

    case EnumBudgetAction.DELETE_ALL_BUDGETS: {
      return {
        ...state,
        budgetsData: [],
      };
    }

    case EnumBudgetAction.ADD_CATEGORY: {
      const { newCategoryData, budgetIndex } = action.payload;
      const newBudgetsData = [...state.budgetsData];

      newBudgetsData[budgetIndex].category = [...newBudgetsData[budgetIndex].category, newCategoryData];
      return { ...state, budgetsData: newBudgetsData };
    }

    case EnumBudgetAction.CHANGE_NAME_CATEGORY: {
      const { volatileCategoryId, budgetIndex, newCategoryName } = action.payload;
      const newBudgetsData = [...state.budgetsData];
      newBudgetsData[budgetIndex].category.map((el) =>
        el.categoryId === volatileCategoryId ? (el.name = newCategoryName) : el
      );
      console.log(newBudgetsData);
      return { ...state, budgetsData: newBudgetsData };
    }

    case EnumBudgetAction.DELETE_CATEGORY: {
      const { budgetIndex, categoryDeleteId, categoryFreeId, categoryFreeValue } = action.payload;
      const newBudgetsData = [...state.budgetsData];
      const newCategoryArray = state.budgetsData[budgetIndex].category.reduce(
        (acc: ICategoryFormatData[], el) => {
          if (el.categoryId === categoryDeleteId) return acc;

          if (el.categoryId === categoryFreeId) {
            acc.push({ ...el, value: categoryFreeValue });
            return acc;
          }
          acc.push(el);
          return acc;
        },
        []
      );
      newBudgetsData[budgetIndex].category = newCategoryArray;
      return {
        ...state,
        budgetsData: newBudgetsData,
      };
    }

    default:
      return { ...state };
  }
};
