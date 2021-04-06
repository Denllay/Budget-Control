import { TCurrency } from '@/types/Budget/Budget';

export type TVolatileBudgetsData = Record<string, IVolatileBudgetItemData>;

interface IVolatileBudgetItemData {
  budgetIsChange: boolean;
  volatileCategoryId: string;
  volatileCategoryName: string;
  volatileCategoryMoney: number;
  volatileCategoryCurrency: TCurrency | null;
  volatileCategoryColor: string;
}
export enum EnumVolatileBudgetAction {
  SET_VOLATILE_DATA = 'SET_VOLATILE_DATA',
  CLEAR_VOLATILE_DATA = 'CLEAR_VOLATILE_DATA',
  CHANGE_DATA_CATEGORY = 'CHANGE_DATA_CATEGORY',
}

interface ISetVolatileBudgetData {
  type: EnumVolatileBudgetAction.SET_VOLATILE_DATA;
  payload: ISetVolatileBudgetDataAction;
}

export interface ISetVolatileBudgetDataAction {
  volatileCategoryName: string;
  volatileCategoryMoney: number;
  volatileCategoryColor: string;
  volatileCategoryId: string;
  volatileCategoryCurrency: TCurrency;
  budgetId: string;
}

interface IClearVolatileData {
  type: EnumVolatileBudgetAction.CLEAR_VOLATILE_DATA;
  payload: {
    budgetId: string;
  };
}

export type TVolatileBudgetAction = ISetVolatileBudgetData | IClearVolatileData;
