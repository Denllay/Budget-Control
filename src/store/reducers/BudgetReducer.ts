import { ICategoryFormatData } from '@/types/Budget/Budget';
import { EnumBudgetAction, IBudgetState, TBudgetActions } from '../types/Budget/Budget';

const initialState: IBudgetState = {
  budgetsLoadingStatus: 'LOADING',
  budgetsLength: 0,
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
        budgetsLength: --state.budgetsLength,
        budgetsData: state.budgetsData.filter(({ budgetId }) => budgetId !== action.payload.budgetId),
      };
    }

    case EnumBudgetAction.ADD_BUDGET: {
      return {
        ...state,
        budgetsLength: ++state.budgetsLength,
        budgetsData: [...state.budgetsData, action.payload],
      };
    }

    case EnumBudgetAction.DELETE_ALL_BUDGETS: {
      return {
        ...state,
        budgetsLength: 0,
        budgetsData: [],
      };
    }

    case EnumBudgetAction.ADD_CATEGORY: {
      const { categoryData, budgetIndex, categoryAvailableMoney, categoryAvaibleId } = action.payload;
      const newBudgetsData = [...state.budgetsData];

      const newCategoryArray = newBudgetsData[budgetIndex].category.map((el) => {
        el.categoryId === categoryAvaibleId && (el.categoryMoney = categoryAvailableMoney);
        return el;
      });

      newBudgetsData[budgetIndex].category = [...newCategoryArray, categoryData];
      return { ...state, budgetsData: newBudgetsData };
    }

    case EnumBudgetAction.CHANGE_DATA_CATEGORY: {
      const {
        volatileCategoryId,
        budgetIndex,
        categoryName,
        categoryMoney,
        availableIdCategory,
        categoryAvailableMoney,
        categoryColor,
      } = action.payload;

      const newBudgetsData = [...state.budgetsData];
      const newCategoryArray = newBudgetsData[budgetIndex].category.reduce(
        (acc: ICategoryFormatData[], el) => {
          el.categoryId === volatileCategoryId &&
            (el = { ...el, categoryName, categoryMoney, categoryColor });

          el.categoryId === availableIdCategory && (el.categoryMoney = categoryAvailableMoney);

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

      const newCategoryArray = state.budgetsData[budgetIndex].category.reduce(
        (acc: ICategoryFormatData[], el) => {
          if (el.categoryId === categoryDeleteId) return acc;

          if (el.categoryId === availableIdCategory) {
            acc.push({ ...el, categoryMoney: availableMoneyCategory });
            return acc;
          }
          acc.push(el);
          return acc;
        },
        []
      );
      const newBudgetsData = [...state.budgetsData];
      newBudgetsData[budgetIndex].category = newCategoryArray;
      return {
        ...state,
        budgetsData: newBudgetsData,
      };
    }

    case EnumBudgetAction.GET_LENGTH_BUDGET: {
      return { ...state, budgetsLength: action.payload.budgetsLength };
    }

    default:
      return { ...state };
  }
};
