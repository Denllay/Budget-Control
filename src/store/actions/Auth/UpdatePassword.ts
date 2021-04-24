import { EnumAlertModalData, TAlertModalData } from '@/types/Modal';
import firebase, { app, auth } from '../../../firebase/config';
interface IData {
  currentPassword: string;
  password: string;
  openAlertModal(dataModal: TAlertModalData): void;
}
export const UpdatePassword = ({ currentPassword, password, openAlertModal }: IData) => {
  return (): void => {
    const email = auth.currentUser && auth.currentUser.email;
    const user = app.auth().currentUser as firebase.User;

    user
      .reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(email!, currentPassword))
      .then(() => user.updatePassword(password).then(() => openAlertModal(EnumAlertModalData.SUCCESSFUL)))
      .catch(({ code, message }) =>
        code === 'auth/wrong-password' ? openAlertModal(EnumAlertModalData.ERROR) : console.error(message)
      );
  };
};
