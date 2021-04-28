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
export interface ISetVolatileBudgetDataAction {
  volatileCategoryName: string;
  volatileCategoryMoney: number;
  volatileCategoryColor: string;
  volatileCategoryId: string;
  volatileCategoryCurrency: TCurrency;
  budgetId: string;
}
