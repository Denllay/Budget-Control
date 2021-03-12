import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { TRootReducer } from '../store/reducers';

export const useTypedSelector: TypedUseSelectorHook<TRootReducer> = useSelector;
