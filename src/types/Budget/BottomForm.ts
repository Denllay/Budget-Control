export type OnSubmitBottomFormFunction = (data: IArgumentSubmitFunction) => void;

interface IArgumentSubmitFunction {
  categoryMoney: number;
  categoryName: string;
  categoryColor: string;
}

export interface IFormValuesBottomForm {
  categoryName: string;
  categoryMoney: number;
  categoryCurrency: string;
}
