import { AppThunk } from '@/store';
import { auth } from '@/firebase/config';

export const SignOutAuth = (): AppThunk => () => auth.signOut().catch(console.log);
