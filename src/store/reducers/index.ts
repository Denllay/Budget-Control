import { combineReducers } from 'redux';
import { AuthReducer } from './AuthReducer';
import { BudgetReducer } from './BudgetReducer';
import { ModalReducer } from './ModalReducer';
export const RootReducer = combineReducers({
  auth: AuthReducer,
  modal: ModalReducer,
  budget: BudgetReducer,
});
export type TRootReducer = ReturnType<typeof RootReducer>;
