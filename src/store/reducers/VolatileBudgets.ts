import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TVolatileBudgetsData, ISetVolatileBudgetDataAction } from '../types/Budget/VolatileBudget';

const initialState: TVolatileBudgetsData = {};

const VolatileBudgets = createSlice({
  name: 'VolatileBudgets',
  initialState,
  reducers: {
    setVolatileData(state, { payload }: PayloadAction<ISetVolatileBudgetDataAction>) {
      const { budgetId } = payload;

      state[budgetId] = {
        budgetIsChange: true,
        ...payload,
      };
    },

    clearVolatileDataById(state, { payload }: PayloadAction<string>) {
      state[payload] = {
        budgetIsChange: false,
        volatileCategoryId: '',
        volatileCategoryName: '',
        volatileCategoryColor: '',
        volatileCategoryCurrency: null,
        volatileCategoryMoney: 0,
      };
    },
  },
});

export default VolatileBudgets.reducer;
export const { clearVolatileDataById, setVolatileData } = VolatileBudgets.actions;
