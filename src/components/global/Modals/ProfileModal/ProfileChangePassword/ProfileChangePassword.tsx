import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useActions } from '@/hooks/useActions';
import styles from './ProfileChangePassword.module.scss';
import { TProfileView } from '../types/profileTypes';
import { CreateModal } from '@/utilities/CreateModal/CreateModal';
import { AlertModal } from '../../AlertModal/AlertModal';
import { TAlertModalData } from '@/types/Modal';
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
  const [muttableModalData, setMuttableModalData] = useState<TAlertModalData | null>(null);

  const { register: passwordRef, handleSubmit, reset, watch, errors } = useForm<TInputs>();
  const password = useRef({});
  password.current = watch('newPassword', '');

  const { toggleModal: toggleAlertModal, ModalComponent } = CreateModal({
    component: AlertModal,
    dataModal: muttableModalData as TAlertModalData,
  });

  const openAlertModal = (modalData: TAlertModalData) => {
    setMuttableModalData(modalData);
    toggleAlertModal();
  };

  const onSubmit: SubmitHandler<TInputs> = ({ currentPassword, newPassword }) => {
    UpdatePassword({
      currentPassword,
      newPassword,
      openAlertModal,
    });
    reset();
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
          ref={passwordRef({
            required: true,
            minLength: {
              value: 6,
              message: '⚠ Password must have at least 6 characters',
            },
            pattern: /^[A-Za-z0-9@\_\.]+$/i,
          })}
          className={styles.block_form_input}
        />

        {errors.currentPassword && <p className={styles.text_alert}>{errors.currentPassword.message}</p>}

        <input
          name="newPassword"
          placeholder="New password"
          autoComplete="off"
          ref={passwordRef({
            required: true,
            minLength: {
              value: 6,
              message: '⚠ Password must have at least 6 characters',
            },
            pattern: /^[A-Za-z0-9@\_\.]+$/i,
          })}
          className={styles.block_form_input}
        />

        {errors.newPassword && <p className={styles.text_alert}>{errors.newPassword.message}</p>}

        <input
          name="confirmPassword"
          placeholder="Confirm password"
          autoComplete="off"
          ref={passwordRef({
            validate: (value: string) => value === password.current || '⚠ The passwords do not match',
          })}
          className={styles.block_form_input}
        />

        {errors.confirmPassword && <p className={styles.text_alert}>{errors.confirmPassword.message}</p>}

        <input type="submit" className={styles.submit} value="Change" />
      </form>
      {ModalComponent}
    </div>
  );
};
