import { TAuthAction, IAuthInitialState, EnumAuthAction } from '../../types/Auth/Auth';

const initialState: IAuthInitialState = {
  status: EnumAuthAction.AUTH_PENDING,
};
export const AuthReducer = (state = initialState, action: TAuthAction) => {
  switch (action.type) {
    case EnumAuthAction.AUTH_LOGIN:
      return { ...state, status: EnumAuthAction.AUTH_LOGIN };
    case EnumAuthAction.AUTH_ENTERED:
      return { ...state, status: EnumAuthAction.AUTH_ENTERED };
    default:
      return { ...state };
  }
};
