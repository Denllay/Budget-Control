import firebase, { app, auth } from '../../../firebase/config';
interface IData {
  currentPassword: string;
  newPassword: string;
}
export const UpdatePassword = ({ currentPassword, newPassword }: IData) => {
  return () => {
    try {
      const email = !!auth.currentUser ? (auth.currentUser.email as string) : 'null';
      const user = app.auth().currentUser as firebase.User;
      const cred = firebase.auth.EmailAuthProvider.credential(email, currentPassword);
      user
        .reauthenticateWithCredential(cred)
        .then(() => {
          user
            .updatePassword(newPassword)
            .then(() => {
              console.log('Password updated!');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
};
