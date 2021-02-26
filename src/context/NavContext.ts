import { SetStateAction, createContext, Dispatch } from 'react';
import { TModalAuth } from '../types/ModalAuth';
type TNavContext = {
  setModalAuthStatus: Dispatch<SetStateAction<TModalAuth>>;
};
export const NavContext = createContext({} as TNavContext);
