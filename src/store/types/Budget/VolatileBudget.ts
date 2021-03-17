export interface IVolatileBudgetsData {
  [key: string]: IVolatileBudgetItemData;
}
interface IVolatileBudgetItemData {
  budgetIsChange: boolean;
  volatileCategoryId: null | string;
  volatileInputValue: null | string;
  volatileInputStartValue: null | string;
}
export enum EnumVolatileBudgetAction {
  SET_VOLATILE_DATA = 'SET_VOLATILE_DATA',
  CHANGE_VOLATILE_INPUT = 'CHANGE_VOLATILE_INPUT',
  CLEAR_VOLATILE_DATA = 'CLEAR_VOLATILE_DATA',
}

interface ISetVolatileBudgetData {
  type: EnumVolatileBudgetAction.SET_VOLATILE_DATA;
  payload: ISetVolatileBudgetDataAction;
}
//
interface IChangeVolatileInput {
  type: EnumVolatileBudgetAction.CHANGE_VOLATILE_INPUT;
  payload: {
    budgetId: string;
    volatileInputValue: string;
  };
}
export interface ISetVolatileBudgetDataAction {
  volatileInputValue: string;
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
export type TVolatileBudgetAction = ISetVolatileBudgetData | IChangeVolatileInput | IClearVolatileData;
