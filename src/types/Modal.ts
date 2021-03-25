interface IPropsDefaultModal {
  closeModal(): void;
  dataModal: string;
}
export interface IPropsAlertModal {
  closeModal(): void;
  dataModal: TAlertModalData;
}
export enum EnumAlertModalData {
  SUCCESSFUL = 'SUCCESSFUL',
  ERROR = 'ERROR',
}
type TAlertModalData = EnumAlertModalData.ERROR | EnumAlertModalData.SUCCESSFUL;

export type IPropsModalComponent = IPropsAlertModal | IPropsDefaultModal;
