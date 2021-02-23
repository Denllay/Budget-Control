import { TCurrency } from '../../../types/Budget';
export const enum EnumLoadBudgetAction {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}
type TLoadBudgetAction = EnumLoadBudgetAction.LOADED | EnumLoadBudgetAction.LOADING;
export interface IBudgetInitialState {
  showAddMenu: boolean;
  budgets: null;
  loadStatus: TLoadBudgetAction;
}

///
export interface ICategoryData {
  color: string;
  name: string;
  value: number;
  currency: TCurrency;
}
export interface ICategoryFormatData extends ICategoryData {
  categoryId: string;
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
  BUDGET_REMOVE = 'BUDGET_REMOVE',
  BUDGET_CATEGORY_ADD = 'BUDGET_CATEGORY_ADD',
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
export interface IBudgetRemove {
  type: EnumActionBudget.BUDGET_REMOVE;
  budgetId: string;
}
export type TBudgetAction = IBudgetShowMenuAction | IBudgetGetDataAction | IBudgetClearData | IBudgetRemove;

///

export interface IBudgetAddData {
  title: string;
  category: IBudgetAddDataCategory;
}
interface IBudgetAddDataCategory {
  free: ICategoryData;
}
