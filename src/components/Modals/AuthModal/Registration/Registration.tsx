import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
import { FormInput } from '@/components/UIKit/FormInput/FormInput';
import { password, confirmPassword } from '@/validationSchemes';
import { RegAuth } from '@/store/actions/Auth/RegAuth';
import { Button } from '@/components/UIKit/Button/Button';
import styles from '../AuthModal.module.scss';
import * as Yup from 'yup';

interface IFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

interface IProps {
  setAlertModalStatus: Dispatch<SetStateAction<boolean>>;
}

const authSchema: Yup.SchemaOf<IFormValues> = Yup.object().shape({
  password,
  confirmPassword,
  email: Yup.string()
    .required('⚠ Enter your email')
    .matches(/^\S+@\S+$/i, '⚠ Wrong email format'),
});

export const Registration: React.FC<IProps> = ({ setAlertModalStatus }) => {
  const onSubmit = ({ password, email }: IFormValues) => {
    RegAuth({ password, email, setAlertModalStatus });
  };

  return (
    <>
      <div className={styles.block_title}>Registration</div>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        onSubmit={onSubmit}
        validationSchema={authSchema}
      >
        <Form className={styles.block_form}>
          <Field type="email" name="email" placeholder="Email" className={styles.input} component={FormInput} />

          <Field type="password" name="password" placeholder="Password" className={styles.input} component={FormInput} />

          <Field
            type="password"
            name="confirmPassowrd"
            placeholder="Confirm password"
            className={styles.input}
            component={FormInput}
          />
          <Button className={styles.button} theme="green" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};
