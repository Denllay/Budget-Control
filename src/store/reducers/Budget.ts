import { IBudgetFormatData } from '@/types/Budget/Budget';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddCategory, IBudgetState, IChangeCategory, IDeleteCategory, TGetDataBudget } from '../types/Budget/Budget';

const initialState: IBudgetState = {
  budgetsLoadingStatus: 'LOADING',
  budgetsLength: 0,
  budgetsData: [],
};

const Budget = createSlice({
  name: 'Budget',
  initialState,
  reducers: {
    getDataBudgets(state, { payload }: PayloadAction<TGetDataBudget>) {
      state.budgetsLoadingStatus = 'LOADED';
      state.budgetsData = payload;
    },

    deleteBudgetById(state, { payload }: PayloadAction<string>) {
      state.budgetsLength -= 1;
      state.budgetsData = state.budgetsData.filter(({ budgetId }) => budgetId !== payload);
    },

    addBudget(state, { payload }: PayloadAction<IBudgetFormatData>) {
      state.budgetsLength += 1;
      state.budgetsData.push(payload);
    },

    deleteAllBudgets(state) {
      state.budgetsLength = 0;
      state.budgetsData = [];
    },

    budgetAddCategory(state, { payload }: PayloadAction<IAddCategory>) {
      const indexCategoryAvaibleMoney = 0;
      const { categoryData, budgetIndex, categoryAvailableMoney } = payload;

      state.budgetsData[budgetIndex].category[indexCategoryAvaibleMoney].categoryMoney = categoryAvailableMoney;
      state.budgetsData[budgetIndex].category.push(categoryData);
    },

    budgetChangeCateogry(state, { payload }: PayloadAction<IChangeCategory>) {
      const {
        budgetIndex,
        availableIdCategory,
        categoryAvailableMoney,
        volatileCategoryId,
        ...categoryChangeData
      } = payload;

      state.budgetsData[budgetIndex].category = state.budgetsData[budgetIndex].category.map((el) => {
        if (el.categoryId === availableIdCategory) {
          el.categoryMoney = categoryAvailableMoney;
        }
        if (el.categoryId === volatileCategoryId) {
          el = { ...el, ...categoryChangeData };
        }
        return el;
      });
    },

    budgetDeleteCategory(state, { payload }: PayloadAction<IDeleteCategory>) {
      const indexCategoryAvaibleMoney = 0;
      const { budgetIndex, categoryDeleteId, availableMoneyCategory } = payload;

      state.budgetsData[budgetIndex].category = state.budgetsData[budgetIndex].category.filter(
        (el) => el.categoryId !== categoryDeleteId
      );

      state.budgetsData[budgetIndex].category[indexCategoryAvaibleMoney].categoryMoney = availableMoneyCategory;
    },

    setLenghtBudgets(state, { payload }: PayloadAction<number>) {
      state.budgetsLength = payload;
    },
  },
});

export default Budget.reducer;

export const {
  addBudget,
  budgetChangeCateogry,
  deleteAllBudgets,
  deleteBudgetById,
  budgetDeleteCategory,
  getDataBudgets,
  setLenghtBudgets,
  budgetAddCategory,
} = Budget.actions;
