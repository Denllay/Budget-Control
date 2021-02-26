import { createContext, Dispatch, SetStateAction } from 'react';
import { TProfileView } from '../components/Nav/NavMain/ProfModule/types/profileMainTypes';
type TProfileContext = {
  email: string;
  setProfileView: Dispatch<SetStateAction<TProfileView>>;
};
export const ProfileContext = createContext({} as TProfileContext);
