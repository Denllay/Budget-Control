import { Dispatch } from 'react';
import { auth } from '../../../firebase/config';
import { EnumAuthAction, TAuthAction } from '../../types/Auth/Auth';

export const SignOutAuth = () => {
  return async (dispatch: Dispatch<TAuthAction>) => {
    try {
      auth.signOut();
      dispatch({ type: EnumAuthAction.AUTH_UNAUTHORIZED });
    } catch (error) {
      console.log(error);
    }
  };
};
