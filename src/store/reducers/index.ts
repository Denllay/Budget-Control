import { combineReducers } from 'redux';
import { AuthReducer } from './AuthReducer';
import { BudgetReducer } from './BudgetReducer';
import { ModalReducer } from './ModalReducer';
import { VolatileBudgetsReducer } from './VolatileBudgetsReducer';
export const RootReducer = combineReducers({
  auth: AuthReducer,
  modal: ModalReducer,
  budgets: BudgetReducer,
  volatileBudgets: VolatileBudgetsReducer,
});
export type TRootReducer = ReturnType<typeof RootReducer>;
