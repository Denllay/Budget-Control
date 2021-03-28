import { EnumAlertModalData, TAlertModalData } from '@/types/Modal';
import firebase, { app, auth } from '../../../firebase/config';
interface IData {
  currentPassword: string;
  newPassword: string;
  openAlertModal(dataModal: TAlertModalData): void;
}
export const UpdatePassword = ({ currentPassword, newPassword, openAlertModal }: IData) => {
  return (): void => {
    const email = auth.currentUser ? (auth.currentUser.email as string) : 'null';
    const user = app.auth().currentUser as firebase.User;

    user
      .reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(email, currentPassword))
      .then(() => user.updatePassword(newPassword).then(() => openAlertModal(EnumAlertModalData.SUCCESSFUL)))
      .catch(({ code, message }) =>
        code === 'auth/wrong-password' ? openAlertModal(EnumAlertModalData.ERROR) : console.error(message)
      );
  };
};
