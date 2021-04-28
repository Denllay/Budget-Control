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
export interface IActionCheckAuth {
  payload: EnumAuthAction;
}
