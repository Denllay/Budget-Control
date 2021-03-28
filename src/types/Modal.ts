interface IPropsDefaultModal {
  closeModal(): void;
  dataModal: string;
}
interface IPropsAlertModal {
  closeModal(): void;
  dataModal: TAlertModalData;
}
export enum EnumAlertModalData {
  SUCCESSFUL = 'SUCCESSFUL',
  ERROR = 'ERROR',
}
export type TAlertModalData = EnumAlertModalData.ERROR | EnumAlertModalData.SUCCESSFUL;

export enum EnumAuthModalData {
  LOGIN = 'LOGIN',
  REGISTRATION = 'REGISTRATION',
}
type TAuthModalData = EnumAuthModalData.LOGIN | EnumAuthModalData.REGISTRATION;
interface IPropsAuthModal {
  closeModal(): void;
  dataModal: TAuthModalData;
}

export type IPropsModalComponent = IPropsAlertModal | IPropsDefaultModal | IPropsAuthModal;
