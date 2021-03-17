import { Dispatch } from 'react';
import { auth } from '../../../firebase/config';
import { EnumAuthAction, IAuthPayload, TAuthAction } from '../../types/Auth/Auth';

export const RegAuth = ({ password, email }: IAuthPayload) => {
  return (dispatch: Dispatch<TAuthAction>) => {
    try {
      auth.createUserWithEmailAndPassword(email, password);
      dispatch({ type: EnumAuthAction.AUTH_ENTERED });
    } catch (error) {
      console.log(error);
    }
  };
};
