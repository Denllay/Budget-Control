import firebase, { app, auth } from '../../../firebase/config';
interface IData {
  currentPassword: string;
  newPassword: string;
  openSuccessfulModal(): void;
  openErrorModal(): void;
}
export const UpdatePassword = ({
  currentPassword,
  newPassword,
  openSuccessfulModal,
  openErrorModal,
}: IData) => {
  return (): void => {
    const email = auth.currentUser ? (auth.currentUser.email as string) : 'null';
    const user = app.auth().currentUser as firebase.User;
    user
      .reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(email, currentPassword))
      .then(() => user.updatePassword(newPassword).then(openSuccessfulModal))
      .catch(({ code, message }) =>
        code === 'auth/wrong-password' ? openErrorModal() : console.error(message)
      );
  };
};
