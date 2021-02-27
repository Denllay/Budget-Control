import { Dispatch, SetStateAction, createContext } from 'react';

interface IBudgetColorContext {
  setDisplayColor: Dispatch<SetStateAction<boolean>>;
  displayColor: boolean;
}
export const BudgetColorContext = createContext({} as IBudgetColorContext);
