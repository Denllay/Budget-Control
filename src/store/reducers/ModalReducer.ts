import { IModalState, TModalAction } from '@/store/types/Modal/Modal';
import { EnumModalAction } from '@/types/Modal';

const initialState: IModalState = {
  modalStatus: null,
};
export const ModalReducer = (state = initialState, action: TModalAction): IModalState => {
  switch (action.type) {
    case EnumModalAction.SHOW_ADD_BUDGET_MODAL: {
      return { ...state, modalStatus: EnumModalAction.SHOW_ADD_BUDGET_MODAL };
    }
    case EnumModalAction.SHOW_AUTH_MODAL: {
      return { ...state, modalStatus: EnumModalAction.SHOW_AUTH_MODAL, dataModal: action.payload };
    }
    case EnumModalAction.SHOW_PROF_MODAL: {
      return { ...state, modalStatus: EnumModalAction.SHOW_PROF_MODAL };
    }
    case EnumModalAction.SHOW_ALERT_MODAL: {
      return { ...state, modalStatus: EnumModalAction.SHOW_ALERT_MODAL, dataModal: action.payload };
    }
    case EnumModalAction.CLOSE_MODAL: {
      return { ...state, modalStatus: null };
    }
    default:
      return { ...state };
  }
};
