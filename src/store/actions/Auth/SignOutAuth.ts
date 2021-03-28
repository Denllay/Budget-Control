import { auth } from '../../../firebase/config';

export const SignOutAuth = () => () => auth.signOut().catch(console.log);
