import * as Yup from 'yup';

export const password = Yup.string()
  .required('⚠ Enter password')
  .min(6, '⚠ Ppassword cannot be less than 6 characters');

export const confirmPassword = Yup.string()
  .required('⚠ Enter confirm password')
  .oneOf([Yup.ref('password'), null], '⚠ The passwords do not match');
