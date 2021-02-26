import { EnumModalAction, TModalAction } from '@/store/types/Modal/Modal';
import { TModalAuth } from '@/types/ModalAuth';
import { Dispatch } from 'react';

export const ChangeViewAuthModal = (statusAuth: TModalAuth) => (dispatch: Dispatch<TModalAction>) =>
  dispatch({ type: EnumModalAction.SHOW_AUTH_MODAL, payload: statusAuth });
