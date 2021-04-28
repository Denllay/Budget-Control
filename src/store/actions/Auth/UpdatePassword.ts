import { EnumAlertModalData, TAlertModalData } from '@/types/Modal';
import firebase, { app, auth } from '@/firebase/config';
import { AppThunk } from '@/store';
interface IData {
  currentPassword: string;
  password: string;
  openAlertModal(dataModal: TAlertModalData): void;
}

const errorStatusPassword = 'auth/wrong-password';

export const UpdatePassword = ({ currentPassword, password, openAlertModal }: IData): AppThunk => () => {
  const email = auth.currentUser && auth.currentUser.email;
  const userCredential = firebase.auth.EmailAuthProvider.credential(email!, currentPassword);
  const user = app.auth().currentUser as firebase.User;

  user
    .reauthenticateWithCredential(userCredential)
    .then(() =>
      user.updatePassword(password).then(() => {
        openAlertModal(EnumAlertModalData.SUCCESSFUL);
      })
    )
    .catch(({ code, message }) => {
      if (code === errorStatusPassword) {
        openAlertModal(EnumAlertModalData.ERROR);
      } else {
        console.error(message);
      }
    });
};
