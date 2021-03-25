import { combineReducers } from 'redux';
import { AuthReducer } from './AuthReducer';
import { BudgetReducer } from './BudgetReducer';
import { VolatileBudgetsReducer } from './VolatileBudgetsReducer';
export const RootReducer = combineReducers({
  auth: AuthReducer,
  budgets: BudgetReducer,
  volatileBudgets: VolatileBudgetsReducer,
});
export type TRootReducer = ReturnType<typeof RootReducer>;
