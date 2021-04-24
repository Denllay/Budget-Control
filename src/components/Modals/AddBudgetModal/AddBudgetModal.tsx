import React, { Dispatch, SetStateAction } from 'react';
import { useActions } from '@/hooks/useActions';
import { TCurrency } from '@/types/Budget/Budget';
import { Formik, Form, Field } from 'formik';
import { FormInput } from '@/components/UIKit/FormInput/FormInput';
import { FormSelect } from '@/components/UIKit/FormSelect/FormSelect';
import styles from './AddBudgetModal.module.scss';
import * as Yup from 'yup';

interface IFormValues {
  name: string;
  money: string;
  currency: string;
}
interface IProps {
  setModalStatus: Dispatch<SetStateAction<boolean>>;
}

const addBudgetSchema: Yup.SchemaOf<IFormValues> = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3, '⚠ Name must be at least 3 characters long')
    .max(13, '⚠ Maximum name length 13 characters'),

  money: Yup.string().required().required('⚠ You must enter a budget').max(13, '⚠ This value exceeds the maximum value'),

  currency: Yup.string().required(),
});

const options = [
  { value: 'RUB', name: 'RUB' },
  { value: 'USD', name: 'USD' },
];

export const AddBudgetModal: React.FC<IProps> = ({ setModalStatus }) => {
  const { AddBudget } = useActions();

  const onSubmit = ({ name, money, currency }: IFormValues) => {
    AddBudget({ title: name, money: +money, currency: currency as TCurrency });
    setModalStatus(false);
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.block_title}>Please write budget</h2>
      <Formik
        initialValues={{ name: '', money: '', currency: 'RUB' }}
        onSubmit={onSubmit}
        validationSchema={addBudgetSchema}
      >
        <Form className={styles.block_form}>
          <Field name="name" placeholder="Name budget" className={styles.input} component={FormInput} />

          <div className={styles.block_money}>
            <Field name="money" type="number" className={styles.input} placeholder="Money budget" component={FormInput} />

            <FormSelect name="currency" className={styles.select} options={options} />
          </div>

          <input value="Submit" type="submit" className={styles.button} />
        </Form>
      </Formik>
    </div>
  );
};
