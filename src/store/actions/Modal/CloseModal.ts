import { TModalAction } from '@/store/types/Modal/Modal';
import { EnumModalAction } from '@/types/Modal';
import { Dispatch } from 'react';

export const CloseModal = () => (dispatch: Dispatch<TModalAction>) =>
  dispatch({ type: EnumModalAction.CLOSE_MODAL });
