import { Dispatch } from 'react';
import { auth } from '../../../firebase/config';
import { EnumAuthAction, TAuthAction } from '../../types/Auth/Auth';

export const SignOutAuth = () => {
  return async (dispatch: Dispatch<TAuthAction>) => {
    try {
      auth
        .signOut()
        .then(() => {
          dispatch({ type: EnumAuthAction.AUTH_LOGIN });
        })
        .catch(console.log);
    } catch (error) {
      console.log(error);
    }
  };
};
