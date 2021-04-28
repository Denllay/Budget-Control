import { AppDispatch, AppThunk } from '@/store';
import { setAuthStatus } from '@/store/reducers/Auth';
import { EnumAuthAction } from '@/types/Auth';
import { app } from '../../../firebase/config';

export const CheckAuth = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    // ? При не авторизованном юзере user = null, а авторизованный user = object

    app.auth().onAuthStateChanged((user) => {
      const authStatus = user ? EnumAuthAction.AUTH_ENTERED : EnumAuthAction.AUTH_UNAUTHORIZED;

      dispatch(setAuthStatus(authStatus));
    });
  } catch (error) {
    console.log(error);
  }
};
