import { combineReducers } from 'redux';
import { AuthReducer } from './Auth/AuthReducer';
import { BudgetReducer } from './Budget/BudgetReducer';
import { ModalReducer } from './Modal/ModalReducer';
export const RootReducer = combineReducers({ auth: AuthReducer, budget: BudgetReducer, modal: ModalReducer });
export type TRootReducer = ReturnType<typeof RootReducer>;
