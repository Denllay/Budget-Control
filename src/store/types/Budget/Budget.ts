import { IBudgetFormatData, TStatus } from '@/types/Budget/Budget';

export enum EnumBudgetAction {
  GET_DATA_BUDGET = 'GET_DATA_BUDGET',
  CHANGE_BUDGET_ITEM_STATUS = 'CHANGE_BUDGET_ITEM_STATUS',
  SET_INPUT_CHANGE = 'SET_INPUT_CHANGE',
}

export interface IBudgetState {
  status: TStatus;
  budgetItems: Array<never> | IBudgetFormatData[];
}
interface IGetDataBudget {
  type: EnumBudgetAction.GET_DATA_BUDGET;
  payload: IBudgetFormatData[] | Array<never>;
}
interface IChangeBudgetItemStatus {
  type: EnumBudgetAction.CHANGE_BUDGET_ITEM_STATUS;
}
interface ISetInputChange {
  type: EnumBudgetAction.SET_INPUT_CHANGE;
  payload: {
    indexItem: number;
  };
}

export type TBudgetActions = IGetDataBudget | IChangeBudgetItemStatus | ISetInputChange;
