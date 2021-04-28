import { AppDispatch, AppThunk } from '@/store';
import { setVolatileData } from '@/store/reducers/VolatileBudgets';
import { ISetVolatileBudgetDataAction } from '@/store/types/Budget/VolatileBudget';

export const SetVolatileInitialData = (data: ISetVolatileBudgetDataAction): AppThunk => (dispatch: AppDispatch) => {
  dispatch(setVolatileData(data));
};
