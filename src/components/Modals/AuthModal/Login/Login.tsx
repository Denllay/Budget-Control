import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
import { useActions } from '@/hooks/useActions';
import { FormInput } from '@/components/UIKit/FormInput/FormInput';
import { password } from '@/validationSchemes';
import * as Yup from 'yup';
import styles from '../AuthModal.module.scss';

interface IProps {
  setAlertModalStatus: Dispatch<SetStateAction<boolean>>;
}

interface IFormValues {
  email: string;
  password: string;
  confirmPassowrd?: string;
}

const authSchema: Yup.SchemaOf<IFormValues> = Yup.object().shape({
  password,
  confirmPassowrd: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  email: Yup.string().required('⚠ Enter your email'),
});

export const Login: React.FC<IProps> = ({ setAlertModalStatus }) => {
  const { LoginAuth } = useActions();

  const onSubmit = ({ password, email }: IFormValues) => {
    LoginAuth({ password, email, setAlertModalStatus });
  };

  return (
    <>
      <div className={styles.block_title}>Login</div>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit} validationSchema={authSchema}>
        <Form className={styles.block_form}>
          <Field type="email" name="email" placeholder="Email" className={styles.input} component={FormInput} />

          <Field type="password" name="password" placeholder="Password" className={styles.input} component={FormInput} />

          <input type="submit" value="submit" className={styles.submit} />
        </Form>
      </Formik>
    </>
  );
};
