import { EnumAuthAction, TAuthStatus } from '@/types/Auth';
import { Dispatch, SetStateAction } from 'react';

export interface IAuthPayload {
  email: string;
  password: string;
  setAlertModalStatus: Dispatch<SetStateAction<boolean>>;
}
export interface IAuthState {
  status: TAuthStatus;
}
interface IAuthPendingAction {
  type: EnumAuthAction.AUTH_PENDING;
}
interface IAuthLoginAction {
  type: EnumAuthAction.AUTH_UNAUTHORIZED;
}
interface IAuthEnteredAction {
  type: EnumAuthAction.AUTH_ENTERED;
}
export type TAuthAction = IAuthPendingAction | IAuthLoginAction | IAuthEnteredAction;
