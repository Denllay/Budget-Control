import { IBudgetFormatData, ICategoryFormatData, TBudgetLoadingStatus } from '@/types/Budget/Budget';
export interface IBudgetState {
  budgetsLength: number;
  budgetsLoadingStatus: TBudgetLoadingStatus;
  budgetsData: IBudgetFormatData[];
}
export type TGetDataBudget = IBudgetFormatData[] | never[];
export interface IAddCategory {
  categoryData: ICategoryFormatData;
  budgetIndex: number;
  categoryAvailableMoney: number;
}
export interface IChangeCategory {
  budgetIndex: number;
  volatileCategoryId: string;
  categoryName: string;
  availableIdCategory: string;
  categoryMoney: number;
  categoryAvailableMoney: number;
  categoryColor: string;
}
export interface IDeleteCategory {
  categoryDeleteId: string;
  budgetIndex: number;
  availableMoneyCategory: number;
}
