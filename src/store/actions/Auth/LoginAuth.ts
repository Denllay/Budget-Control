import { Dispatch } from 'react';
import { auth } from '../../../Firebase/config';
import { EnumAuthAction, TAuthAction } from '../../types/Auth/Auth';
interface IPayload {
  password: string;
  email: string;
}
export const LoginAuth = ({ password, email }: IPayload) => {
  return async (dispatch: Dispatch<TAuthAction>) => {
    try {
      auth.signInWithEmailAndPassword(email, password);
      dispatch({ type: EnumAuthAction.AUTH_ENTERED });
    } catch (error) {
      console.log(error);
    }
  };
};
