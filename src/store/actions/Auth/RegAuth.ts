import { Dispatch } from 'react';
import { auth } from '../../../Firebase/config';
import { EnumAuthAction, IAuthPayload, TAuthAction } from '../../types/Auth/Auth';

export const RegAuth = ({ password, email }: IAuthPayload) => {
  return (dispatch: Dispatch<TAuthAction>) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: EnumAuthAction.AUTH_ENTERED });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
