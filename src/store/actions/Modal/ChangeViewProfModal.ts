import { EnumModalAction, TModalAction } from '@/store/types/Modal/Modal';
import { Dispatch } from 'react';

export const ChangeViewProfModal = () => (dispatch: Dispatch<TModalAction>) =>
  dispatch({ type: EnumModalAction.SHOW_PROF_MODAL });
