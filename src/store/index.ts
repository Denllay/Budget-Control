import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import Auth from './reducers/Auth';
import Budget from './reducers/Budget';
import VolatileBudgets from './reducers/VolatileBudgets';

export const store = configureStore({ reducer: { auth: Auth, budgets: Budget, volatile: VolatileBudgets } });

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, TRootState, null, Action<string>>;
