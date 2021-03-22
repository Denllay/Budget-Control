import { TCurrency } from '@/types/Budget/Budget';

export interface IVolatileBudgetsData {
  [key: string]: IVolatileBudgetItemData;
}
interface IVolatileBudgetItemData {
  budgetIsChange: boolean;
  volatileCategoryId: string;
  volatileCategoryValue: string;
  volatileCategoryMoney: number;
  volatileCategoryColor: string;
}
export enum EnumVolatileBudgetAction {
  SET_VOLATILE_DATA = 'SET_VOLATILE_DATA',
  CLEAR_VOLATILE_DATA = 'CLEAR_VOLATILE_DATA',
}

interface ISetVolatileBudgetData {
  type: EnumVolatileBudgetAction.SET_VOLATILE_DATA;
  payload: ISetVolatileBudgetDataAction;
}
//
export interface ISetVolatileBudgetDataAction {
  volatileCategoryValue: string;
  volatileCategoryMoney: number;
  volatileCategoryColor: string;
  volatileCategoryId: string;
  budgetId: string;
}
//
interface IClearVolatileData {
  type: EnumVolatileBudgetAction.CLEAR_VOLATILE_DATA;
  payload: {
    budgetId: string;
  };
}
export type TVolatileBudgetAction = ISetVolatileBudgetData  | IClearVolatileData;
