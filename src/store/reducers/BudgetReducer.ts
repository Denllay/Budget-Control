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
      const { newCategoryData, budgetIndex, availableMoneyCategory, availableIdCategory } = action.payload;
      const newBudgetsData = [...state.budgetsData];

      const newCategoryArray = newBudgetsData[budgetIndex].category.map((el) => {
        el.categoryId === availableIdCategory && (el.value = availableMoneyCategory);
        return el;
      });

      newBudgetsData[budgetIndex].category = [...newCategoryArray, newCategoryData];
      return { ...state, budgetsData: newBudgetsData };
    }

    case EnumBudgetAction.CHANGE_DATA_CATEGORY: {
      const {
        volatileCategoryId,
        budgetIndex,
        newCategoryName,
        newCategoryMoney,
        availableIdCategory,
        newcategoryAvailableMoney,
        newCategoryColor,
      } = action.payload;

      const newBudgetsData = [...state.budgetsData];
      const newCategoryArray = newBudgetsData[budgetIndex].category.reduce(
        (acc: ICategoryFormatData[], el) => {
          if (el.categoryId === volatileCategoryId) {
            el.name = newCategoryName;
            el.value = newCategoryMoney;
            el.color = newCategoryColor;
          }
          el.categoryId === availableIdCategory && (el.value = newcategoryAvailableMoney);

          acc.push(el);
          return acc;
        },
        []
      );

      newBudgetsData[budgetIndex].category = newCategoryArray;

      return { ...state, budgetsData: newBudgetsData };
    }

    case EnumBudgetAction.DELETE_CATEGORY: {
      const { budgetIndex, categoryDeleteId, availableIdCategory, availableMoneyCategory } = action.payload;
      const newBudgetsData = [...state.budgetsData];

      const newCategoryArray = state.budgetsData[budgetIndex].category.reduce(
        (acc: ICategoryFormatData[], el) => {
          if (el.categoryId === categoryDeleteId) return acc;

          if (el.categoryId === availableIdCategory) {
            acc.push({ ...el, value: availableMoneyCategory });
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
