import { TModalAction } from '@/store/types/Modal/Modal';
import { Dispatch } from 'react';

export const ChangeViewModal = (data: TModalAction) => (dispatch: Dispatch<TModalAction>) => dispatch(data);
