import { TAuthAction, EnumAuthAction, IAuthState } from '../types/Auth/Auth';
const initialState: IAuthState = {
  status: EnumAuthAction.AUTH_PENDING,
};
export const AuthReducer = (state = initialState, action: TAuthAction): IAuthState => {
  switch (action.type) {
    case EnumAuthAction.AUTH_LOGIN:
      return { ...state, status: EnumAuthAction.AUTH_LOGIN };
    case EnumAuthAction.AUTH_ENTERED:
      return { ...state, status: EnumAuthAction.AUTH_ENTERED };
    default:
      return { ...state };
  }
};
