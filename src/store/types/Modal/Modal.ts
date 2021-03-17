import { EnumModalAction, TModalAuthStatus } from '@/types/Modal';

interface IAuthModalAction {
  type: EnumModalAction.SHOW_AUTH_MODAL;
  payload: TModalAuthStatus;
}
interface IAddBudgetModalAction {
  type: EnumModalAction.SHOW_ADD_BUDGET_MODAL;
}
interface IProfModalAction {
  type: EnumModalAction.SHOW_PROF_MODAL;
}
interface ICloseModalAction {
  type: EnumModalAction.CLOSE_MODAL;
}
interface IAlertModalAction {
  type: EnumModalAction.SHOW_ALERT_MODAL;
  payload: string;
}
export type TModalAction =
  | IAuthModalAction
  | IAddBudgetModalAction
  | IProfModalAction
  | ICloseModalAction
  | IAlertModalAction;

export type TModalStatus =
  | EnumModalAction.CLOSE_MODAL
  | EnumModalAction.SHOW_ADD_BUDGET_MODAL
  | EnumModalAction.SHOW_AUTH_MODAL
  | EnumModalAction.SHOW_PROF_MODAL
  | EnumModalAction.SHOW_ALERT_MODAL;

export interface IModalState {
  modalStatus: TModalStatus | null;
  dataModal?: TModalAuthStatus | string;
}
