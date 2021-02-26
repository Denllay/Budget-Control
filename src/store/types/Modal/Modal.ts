import { TModalAuth } from '@/types/ModalAuth';

export const enum EnumModalAction {
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
export interface IIModalnitialState {
  modalStatus: TModalAction | null;
}
