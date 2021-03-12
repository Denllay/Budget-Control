import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { RootReducer } from './reducers/index';
export const store = createStore(RootReducer, applyMiddleware(thunk));
