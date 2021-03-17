export enum EnumAuthAction {
  AUTH_PENDING = 'AUTH_PENDING',
  AUTH_UNAUTHORIZED = 'AUTH_UNAUTHORIZED',
  AUTH_ENTERED = 'AUTH_ENTERED',
}
export type TAuthStatus =
  | EnumAuthAction.AUTH_ENTERED
  | EnumAuthAction.AUTH_UNAUTHORIZED
  | EnumAuthAction.AUTH_PENDING;
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
  type: EnumAuthAction.AUTH_UNAUTHORIZED;
}
interface IAuthEnteredAction {
  type: EnumAuthAction.AUTH_ENTERED;
}
export type TAuthAction = IAuthPendingAction | IAuthLoginAction | IAuthEnteredAction;
