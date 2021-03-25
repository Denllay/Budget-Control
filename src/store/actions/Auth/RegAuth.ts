import { Dispatch } from 'react';
import { auth } from '../../../firebase/config';
import { EnumAuthAction, IAuthPayload, TAuthAction } from '../../types/Auth/Auth';

export const RegAuth = ({ password, email }: IAuthPayload) => {
  return (dispatch: Dispatch<TAuthAction>) => {
    try {
      const animationDuration = 300;
      auth.createUserWithEmailAndPassword(email, password);
      setTimeout(() => dispatch({ type: EnumAuthAction.AUTH_ENTERED }), animationDuration);
    } catch (error) {
      console.log(error);
    }
  };
};
