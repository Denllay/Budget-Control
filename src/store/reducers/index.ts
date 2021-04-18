import { combineReducers } from 'redux';
import { Auth } from './Auth';
import { Budget } from './Budget';
import { VolatileBudgets } from './VolatileBudgets';
export const RootReducer = combineReducers({
  auth: Auth,
  budgets: Budget,
  volatileBudgets: VolatileBudgets,
});
export type TRootReducer = ReturnType<typeof RootReducer>;
