export enum EnumAuthAction {
  AUTH_PENDING = 'AUTH_PENDING',
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_ENTERED = 'AUTH_ENTERED',
}
export type TAuthStatus = EnumAuthAction.AUTH_ENTERED | EnumAuthAction.AUTH_LOGIN | EnumAuthAction.AUTH_PENDING;
export interface IAuthState {
  status: TAuthStatus;
}
export interface IAuthPayload {
  email: string;
  password: string;
}
interface IAuthPendingAction {
  type: EnumAuthAction.AUTH_PENDING;
}
interface IAuthLoginAction {
  type: EnumAuthAction.AUTH_LOGIN;
}
interface IAuthEnteredAction {
  type: EnumAuthAction.AUTH_ENTERED;
}
export type TAuthAction = IAuthPendingAction | IAuthLoginAction | IAuthEnteredAction;
