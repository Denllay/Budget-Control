export enum EnumAlertModalData {
  SUCCESSFUL = 'SUCCESSFUL',
  ERROR = 'ERROR',
}
export type TAlertModalData = EnumAlertModalData.ERROR | EnumAlertModalData.SUCCESSFUL;

export type TAuthModalMode = 'LOGIN' | 'REGISTRATION';
