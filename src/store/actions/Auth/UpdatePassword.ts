import firebase, { app } from '../../../Firebase/config';
interface IData {
  currentPassword: string;
  newPassword: string;
}
export const UpdatePassword = ({ currentPassword, newPassword }: IData) => {
  return () => {
    try {
      const user = app.auth().currentUser;
      const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
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
