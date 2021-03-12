import { TModalAuth } from '@/types/ModalAuth';

export enum EnumModalAction {
  SHOW_AUTH_MODAL = 'SHOW_AUTH_MODAL',
  SHOW_ADD_BUDGET_MODAL = 'SHOW_ADD_BUDGET_MODAL',
  SHOW_PROF_MODAL = 'SHOW_PROF_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
}
interface IAuthModalAction {
  type: EnumModalAction.SHOW_AUTH_MODAL;
  payload: TModalAuth;
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
export type TModalAction = IAuthModalAction | IAddBudgetModalAction | IProfModalAction | ICloseModalAction;
type TModalStatus =
  | EnumModalAction.CLOSE_MODAL
  | EnumModalAction.SHOW_ADD_BUDGET_MODAL
  | EnumModalAction.SHOW_AUTH_MODAL
  | EnumModalAction.SHOW_PROF_MODAL;

export interface IModalState {
  modalStatus: TModalStatus | null;
  currentModalStatus?: TModalAuth;
}
