import React from 'react';
import { Field } from 'formik';
import styles from './FormSelect.module.scss';

interface IProps {
  name: string;
  className?: string;
  options: IOption[];
}
interface IOption {
  value: string;
  name: string;
}
export const FormSelect: React.FC<IProps> = ({ name, options, className }) => {
  const optionsList = options.map(({ name, value }) => {
    return <option key={value}>{name}</option>;
  });

  return (
    <Field as="select" name={name} className={`${styles.select} ${className}`}>
      {optionsList}
    </Field>
  );
};
