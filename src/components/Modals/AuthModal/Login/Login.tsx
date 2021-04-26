import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
import { useActions } from '@/hooks/useActions';
import { password } from '@/validationSchemes';
import { FormInput, Button, Title } from '@/components/UIKit';
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

const titleStyle = {
  fontSize: '36px',
  marginTop: '15px',
  color: '#282d3c',
};

export const Login: React.FC<IProps> = ({ setAlertModalStatus }) => {
  const { LoginAuth } = useActions();

  const onSubmit = ({ password, email }: IFormValues) => {
    LoginAuth({ password, email, setAlertModalStatus });
  };

  return (
    <>
      <Title style={titleStyle}>Login</Title>

      <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit} validationSchema={authSchema}>
        <Form className={styles.block_form}>
          <Field type="email" name="email" placeholder="Email" className={styles.input} component={FormInput} />

          <Field type="password" name="password" placeholder="Password" className={styles.input} component={FormInput} />

          <Button theme="green" className={styles.button} type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};
