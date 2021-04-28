import { EnumAuthAction } from '@/types/Auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from '../types/Auth/Auth';
const initialState: IAuthState = {
  status: EnumAuthAction.AUTH_PENDING,
};

const Auth = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuthStatus(state, { payload }: PayloadAction<EnumAuthAction>) {
      state.status = payload;
    },
  },
});

export default Auth.reducer;
export const { setAuthStatus } = Auth.actions;
