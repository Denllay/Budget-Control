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
