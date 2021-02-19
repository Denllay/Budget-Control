import { TCurrency } from '../../../types/Budget';

export interface IBudgetInitialState {
  showAddMenu: boolean;
}

///
export interface ICategoryData {
  color: string;
  name: string;
  value: number;
  currency: TCurrency;
}
///
export interface IBudgetAddAction {
  title: string;
  value: number;
  currency: TCurrency;
}
///
export const enum EnumActionBudget {
  BUDGET_SHOW_ADD_MENU = 'BUDGET_SHOW_ADD_MENU',
  BUDGET_GET_DATA = 'BUDGET_GET_DATA',
  BUDGET_CLEAR_DATA = 'BUDGET_CLEAR_DATA',
}
export interface IBudgetShowMenuAction {
  type: EnumActionBudget.BUDGET_SHOW_ADD_MENU;
}
export interface IBudgetGetDataAction {
  type: EnumActionBudget.BUDGET_GET_DATA;
  payload: IBudgetsData[];
}
interface IBudgetsData {
  title: string;
  category: ICategoryData[];
}
export interface IBudgetClearData {
  type: EnumActionBudget.BUDGET_CLEAR_DATA;
}
export type TBudgetAction = IBudgetShowMenuAction | IBudgetGetDataAction | IBudgetClearData;

///

export interface IBudgetAddData {
  title: string;
  category: IBudgetAddDataCategory;
}
interface IBudgetAddDataCategory {
  free: ICategoryData;
}
