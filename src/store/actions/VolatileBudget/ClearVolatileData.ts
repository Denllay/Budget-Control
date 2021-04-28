import { AppDispatch, AppThunk } from '@/store';
import { clearVolatileDataById } from '@/store/reducers/VolatileBudgets';

export const ClearVolatileData = (budgetId: string): AppThunk => (dispatch: AppDispatch) => {
  dispatch(clearVolatileDataById(budgetId));
};
