import { EnumModalAction, IIModalnitialState, TModalAction } from '@/store/types/Modal/Modal';

const initialState: IIModalnitialState = {
  modalStatus: null,
};
export const ModalReducer = (state = initialState, action: TModalAction) => {
  switch (action.type) {
    case EnumModalAction.SHOW_ADD_BUDGET_MODAL: {
      return { ...state, modalStatus: EnumModalAction.SHOW_ADD_BUDGET_MODAL };
    }
    case EnumModalAction.SHOW_AUTH_MODAL: {
      return { ...state, modalStatus: EnumModalAction.SHOW_AUTH_MODAL, currentModalStatus: action.payload };
    }
    case EnumModalAction.SHOW_PROF_MODAL: {
      return { ...state, modalStatus: EnumModalAction.SHOW_PROF_MODAL };
    }
    case EnumModalAction.CLOSE_MODAL: {
      return { ...state, modalStatus: null };
    }
    default:
      return { ...state };
  }
};
