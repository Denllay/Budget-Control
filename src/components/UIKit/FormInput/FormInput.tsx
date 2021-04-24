import React from 'react';
import { FieldProps } from 'formik';
import styles from './FormInput.module.scss';
interface IProps {
  type?: string;
  className: string;
}

export const FormInput: React.FC<IProps & FieldProps> = ({
  field,
  className,
  form: { touched, errors },
  type = 'text',
  ...props
}) => (
  <div className={styles.container}>
    <input type={type} {...field} {...props} autoComplete="off" className={`${styles.input} ${className}`} />

    {touched[field.name] && errors[field.name] ? <span className={styles.error}>{errors[field.name]}</span> : null}
  </div>
);
