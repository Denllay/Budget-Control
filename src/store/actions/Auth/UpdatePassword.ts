import { TModalAction } from '@/store/types/Modal/Modal';
import { EnumModalAction } from '@/types/Modal';
import { Dispatch } from 'react';
import firebase, { app, auth } from '../../../firebase/config';
interface IData {
  currentPassword: string;
  newPassword: string;
}
export const UpdatePassword = ({ currentPassword, newPassword }: IData) => {
  return (dispatch: Dispatch<TModalAction>) => {
    const email = auth.currentUser ? (auth.currentUser.email as string) : 'null';
    const user = app.auth().currentUser as firebase.User;
    user
      .reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(email, currentPassword))
      .then(() => {
        user
          .updatePassword(newPassword)
          .then(() => dispatch({ type: EnumModalAction.SHOW_ALERT_MODAL, payload: 'Password updated!' }));
      })
      .catch(({ code, message }) => {
        code === 'auth/wrong-password'
          ? dispatch({ type: EnumModalAction.SHOW_ALERT_MODAL, payload: 'Wrong password!' })
          : console.error(message);
      });
  };
};
