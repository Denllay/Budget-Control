import { Dispatch } from 'react';
import { auth } from '../../../Firebase/config';
import { EnumAuthAction, TAuthAction } from '../../types/Auth/Auth';

export const SignAuth = () => {
  return async (dispatch: Dispatch<TAuthAction>) => {
    try {
      auth.signOut();
      console.log('signOut');
      dispatch({ type: EnumAuthAction.AUTH_LOGIN });
    } catch (error) {
      console.log(error);
    }
  };
};
