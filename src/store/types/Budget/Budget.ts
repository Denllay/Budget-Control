import { IBudgetFormatData, ICategoryFormatData, TBudgetLoadingStatus } from '@/types/Budget/Budget';

export enum EnumBudgetAction {
  GET_DATA_BUDGET = 'GET_DATA_BUDGET',
  DELETE_BUDGET = 'DELETE_BUDGET',
  ADD_BUDGET = 'ADD_BUDGET',
  DELETE_CATEGORY = 'DELETE_CATEGORY',
  CHANGE_DATA_CATEGORY = 'CHANGE_DATA_CATEGORY',
  ADD_CATEGORY = 'ADD_CATEGORY',
  DELETE_ALL_BUDGETS = 'DELETE_ALL_BUDGETS',
}

export interface IBudgetState {
  budgetsLoadingStatus: TBudgetLoadingStatus;
  budgetsData: Array<never> | IBudgetFormatData[];
}
interface IGetDataBudget {
  type: EnumBudgetAction.GET_DATA_BUDGET;
  payload: IBudgetFormatData[] | Array<never>;
}
//
interface IDeleteBudget {
  type: EnumBudgetAction.DELETE_BUDGET;
  payload: {
    budgetId: string;
  };
}
interface IAddBudget {
  type: EnumBudgetAction.ADD_BUDGET;
  payload: IBudgetFormatData;
}
interface IDeleteCategory {
  type: EnumBudgetAction.DELETE_CATEGORY;
  payload: {
    categoryDeleteId: string;
    budgetIndex: number;
    availableIdCategory: string;
    availableMoneyCategory: number;
  };
}

interface IChangeDataCategory {
  type: EnumBudgetAction.CHANGE_DATA_CATEGORY;
  payload: {
    budgetIndex: number;
    volatileCategoryId: string;
    newCategoryName: string;
    availableIdCategory: string;
    newCategoryMoney: number;
    newcategoryAvailableMoney: number;
    newCategoryColor: string;
  };
}

interface IAddCategory {
  type: EnumBudgetAction.ADD_CATEGORY;
  payload: {
    newCategoryData: ICategoryFormatData;
    budgetIndex: number;
    availableIdCategory: string;
    availableMoneyCategory: number;
  };
}

interface IDeleteAllBudgets {
  type: EnumBudgetAction.DELETE_ALL_BUDGETS;
}
export type TBudgetActions =
  | IGetDataBudget
  | IDeleteBudget
  | IAddBudget
  | IDeleteCategory
  | IChangeDataCategory
  | IAddCategory
  | IDeleteAllBudgets;
