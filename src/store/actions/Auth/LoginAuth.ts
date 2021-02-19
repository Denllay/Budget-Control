import { Dispatch } from 'react';
import { auth } from '../../../Firebase/config';
import { EnumAuthAction, IAuthPayload, TAuthAction } from '../../types/Auth/Auth';

export const LoginAuth = ({ password, email }: IAuthPayload) => {
  return async (dispatch: Dispatch<TAuthAction>) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then()
        .catch((error) => {
          console.log(error);
        });
      dispatch({ type: EnumAuthAction.AUTH_ENTERED });
  };
};
