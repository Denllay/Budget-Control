import { Dispatch } from 'react';
import { auth } from '../../../firebase/config';
import { EnumAuthAction, IAuthPayload, TAuthAction } from '../../types/Auth/Auth';

export const LoginAuth = ({ password, email }: IAuthPayload) => {
  return (dispatch: Dispatch<TAuthAction>) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: EnumAuthAction.AUTH_ENTERED });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
