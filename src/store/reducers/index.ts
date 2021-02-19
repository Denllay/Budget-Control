import { combineReducers } from 'redux';
import { AuthReducer } from './Auth/AuthReducer';
import { BudgetReducer } from './Budget/BudgetReducer';
export const RootReducer = combineReducers({ auth: AuthReducer, budget: BudgetReducer });
export type TRootReducer = ReturnType<typeof RootReducer>;
