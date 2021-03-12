import { createContext, Dispatch, SetStateAction } from 'react';
import { TProfileView } from '../components/Modals/ProfModule/types/profileMainTypes';
type TProfileContext = {
  setProfileView: Dispatch<SetStateAction<TProfileView>>;
  onCloseModal(): void;
};
export const ProfileContext = createContext({} as TProfileContext);
