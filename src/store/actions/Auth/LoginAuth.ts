import { auth } from '../../../firebase/config';
import { IAuthPayload } from '../../types/Auth/Auth';

export const LoginAuth = ({ password, email, setAlertModalStatus }: IAuthPayload) => {
  return async () => {
    auth.signInWithEmailAndPassword(email, password).catch(() => setAlertModalStatus(true));
  };
};
