import React, { Dispatch, SetStateAction, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useActions } from '@/hooks/useActions';
import styles from './ProfileChangePassword.module.scss';
import { TProfileView } from '../types/profileTypes';
import { CreateModal } from '@/utilities/CreateModal/CreateModal';
import { AlertModal } from '../../AlertModal/AlertModal';
import { EnumAlertModalData } from '@/types/Modal';
type TInputs = {
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
};
interface IProps {
  setProfileView: Dispatch<SetStateAction<TProfileView>>;
}
export const ProfileChangePassword: React.FC<IProps> = ({ setProfileView }) => {
  const { UpdatePassword } = useActions();
  const { register: password, handleSubmit } = useForm<TInputs>();

  const { toggleModal: toggleSuccessfulModal, ModalComponent: ModalSuccessful } = CreateModal({
    component: AlertModal,
    dataModal: EnumAlertModalData.SUCCESSFUL,
  });

  const { toggleModal: toggleErrorModal, ModalComponent: ModalError } = CreateModal({
    component: AlertModal,
    dataModal: EnumAlertModalData.ERROR,
  });

  const onSubmit: SubmitHandler<TInputs> = (dataForm) => {
    const { currentPassword, newPassword, confirmPassword } = dataForm;

    if (newPassword.trim() === confirmPassword.trim()) {
      UpdatePassword({
        currentPassword,
        newPassword,
        openSuccessfulModal: toggleSuccessfulModal,
        openErrorModal: toggleErrorModal,
      });
    } else {
      console.log('something went wrong'); //! Change
    }
  };

  return (
    <div className={styles.content}>
      <span className={styles.button_back} onClick={() => setProfileView('view')}>
        Back
      </span>
      <div className={styles.block_title}>Change Password</div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.block_form}>
        <input
          name="currentPassword"
          placeholder="Current password"
          autoComplete="off"
          ref={password({ required: true })}
          className={styles.block_form_input}
        />
        <input
          name="newPassword"
          placeholder="New password"
          autoComplete="off"
          ref={password({ required: true, minLength: 6, pattern: /^[A-Za-z0-9]+$/i })}
          className={styles.block_form_input}
        />
        <input
          name="confirmPassword"
          placeholder="Confirm password"
          autoComplete="off"
          ref={password({ required: true, minLength: 6, pattern: /^[A-Za-z0-9]+$/i })}
          className={styles.block_form_input}
        />
        <input type="submit" className={styles.submit} value="Change" />
      </form>
      {ModalSuccessful}
      {ModalError}
    </div>
  );
};
