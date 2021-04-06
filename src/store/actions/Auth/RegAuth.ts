import { auth } from '../../../firebase/config';
import { IAuthPayload } from '../../types/Auth/Auth';

export const RegAuth = ({ password, email, toggleModalError }: IAuthPayload) => {
  return () => {
    auth.createUserWithEmailAndPassword(email, password).catch(() => toggleModalError());
  };
};
