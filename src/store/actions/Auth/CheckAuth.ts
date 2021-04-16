import { EnumAuthAction } from '@/types/Auth';
import { Dispatch } from 'react';
import { app } from '../../../firebase/config';
import { TAuthAction } from '../../types/Auth/Auth';

export const CheckAuth = () => {
  return async (dispatch: Dispatch<TAuthAction>) => {
    try {
      app.auth().onAuthStateChanged((user) => {
        // При не авторизованном юзере user = null, а авторизованный user = object
        dispatch({ type: user ? EnumAuthAction.AUTH_ENTERED : EnumAuthAction.AUTH_UNAUTHORIZED });
      });
    } catch (error) {
      console.log(error);
    }
  };
};
