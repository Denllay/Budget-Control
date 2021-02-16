import { combineReducers } from "redux";
import { CheckAuth } from "./Auth/CheckAuth";

export const RootReducer = combineReducers({ auth: CheckAuth });
export type TRootReducer = ReturnType<typeof RootReducer>;
