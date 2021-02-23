import { SetStateAction, createContext, Dispatch } from 'react';
import { TAuthAction } from '../store/types/Auth/Auth';
import { TModalAuth } from '../types/ModalAuth';
type TNavContext = {
  setModalAuthStatus: Dispatch<SetStateAction<TModalAuth>>;
};
export const NavContext = createContext({} as TNavContext);
