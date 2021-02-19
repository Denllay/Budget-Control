export const enum EnumAuthAction {
  AUTH_PENDING = 'AUTH_PENDING',
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_ENTERED = 'AUTH_ENTERED',
}
export interface IAuthPayload {
  email: string;
  password: string;
}
export interface IAuthInitialState {
  status: EnumAuthAction.AUTH_PENDING;
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
