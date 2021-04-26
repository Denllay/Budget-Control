import React, { Dispatch, SetStateAction, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { TProfileView } from '@/types/ProfileTypes';
import { AlertModal } from '../../AlertModal/AlertModal';
import { TAlertModalData } from '@/types/Modal';
import { Formik, Form, Field } from 'formik';
import { password, confirmPassword } from '@/validationSchemes';
import { Button, FormInput, Modal } from '@/components/UIKit';
import { Title } from '@/components/UIKit/';
import styles from './ProfileChangePassword.module.scss';
import * as Yup from 'yup';

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

const titleStyle = {
  fontSize: '36px',
  marginTop: '15px',
  color: '#282d3c',
};

export const ProfileChangePassword: React.FC<IProps> = ({ setProfileView }) => {
  const { UpdatePassword } = useActions();
  const [alertModalMode, setAlertModalMode] = useState<TAlertModalData | null>(null);
  const [alertModalStatus, setAlertModalStatus] = useState(false);

  const backProfileModalStatus = () => setProfileView('view');

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
        <Button theme="dark" className={styles.button_back} onClick={backProfileModalStatus}>
          Back
        </Button>

        <Title style={titleStyle}>Change Password</Title>

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

            <Field placeholder="Password" name="password" type="password" className={styles.input} component={FormInput} />

            <Field
              placeholder="Confirm password"
              name="confirmPassword"
              type="password"
              className={styles.input}
              component={FormInput}
            />

            <Button className={styles.button} theme="green" type="submit">
              Change
            </Button>
          </Form>
        </Formik>
      </div>

      <Modal modalStatus={alertModalStatus} setModalStatus={setAlertModalStatus}>
        <AlertModal modalMode={alertModalMode!} setAlertModalStatus={setAlertModalStatus} />
      </Modal>
    </>
  );
};
