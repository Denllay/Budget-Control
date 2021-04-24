import React, { Dispatch, SetStateAction, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { TProfileView } from '../types/profileTypes';
import { Modal } from '@/components/global/Modal/Modal';
import { AlertModal } from '../../AlertModal/AlertModal';
import { TAlertModalData } from '@/types/Modal';
import { Formik, Form, Field } from 'formik';
import { password, confirmPassword } from '@/validationSchemes';
import { FormInput } from '@/components/UIKit/FormInput/FormInput';
import * as Yup from 'yup';
import styles from './ProfileChangePassword.module.scss';

interface IFormValues {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
interface IProps {
  setProfileView: Dispatch<SetStateAction<TProfileView>>;
}

const changePasswordSchema: Yup.SchemaOf<IFormValues> = Yup.object().shape({
  password,
  currentPassword: password,
  confirmPassword,
});

export const ProfileChangePassword: React.FC<IProps> = ({ setProfileView }) => {
  const { UpdatePassword } = useActions();
  const [alertModalMode, setAlertModalMode] = useState<TAlertModalData | null>(null);
  const [alertModalStatus, setAlertModalStatus] = useState(false);

  const openAlertModal = (modalData: TAlertModalData) => {
    setAlertModalMode(modalData);
    setAlertModalStatus(true);
  };

  const onSubmit = ({ currentPassword, password }: IFormValues) => {
    UpdatePassword({
      currentPassword,
      password,
      openAlertModal,
    });
  };

  return (
    <>
      <div className={styles.content}>
        <span className={styles.button_back} onClick={() => setProfileView('view')}>
          Back
        </span>
        <div className={styles.block_title}>Change Password</div>
        <Formik
          validationSchema={changePasswordSchema}
          onSubmit={onSubmit}
          initialValues={{ password: '', currentPassword: '', confirmPassword: '' }}
        >
          <Form className={styles.block_form}>
            <Field
              placeholder="Current password"
              name="currentPassword"
              type="password"
              className={styles.input}
              component={FormInput}
            />

            <Field
              placeholder="Password"
              name="password"
              type="password"
              className={styles.input}
              component={FormInput}
            />

            <Field
              placeholder="Confirm password"
              name="confirmPassword"
              type="password"
              className={styles.input}
              component={FormInput}
            />

            <input type="submit" className={styles.submit} value="Change" />
          </Form>
        </Formik>
      </div>

      <Modal modalStatus={alertModalStatus} setModalStatus={setAlertModalStatus}>
        <AlertModal modalMode={alertModalMode!} setAlertModalStatus={setAlertModalStatus} />
      </Modal>
    </>
  );
};
