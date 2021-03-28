import { auth } from '../../../firebase/config';
import { IAuthPayload } from '../../types/Auth/Auth';

export const LoginAuth = ({ password, email, toggleModalError }: IAuthPayload) => {
  return async () => {
    auth.signInWithEmailAndPassword(email, password).catch(() => toggleModalError());
  };
};
