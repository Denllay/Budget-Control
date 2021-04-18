import React from 'react';
import { useActions } from '../../../../hooks/useActions';
import { TCurrency, EnumCurrency } from '../../../../types/Budget/Budget';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './AddBudgetModal.module.scss';
import { IPropsModalComponent } from '@/types/Modal';

type TInputs = {
  nameBudet: string;
  moneyBudget: string;
  currency: TCurrency;
};

export const AddBudgetModal: React.FC<IPropsModalComponent> = ({ closeModal }) => {
  const { AddBudget } = useActions();
  const { register: budgetRef, handleSubmit, setValue, errors } = useForm<TInputs>();

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setValue('currency', e.target.value);

  const onSubmit: SubmitHandler<TInputs> = (dataForm) => {
    const { nameBudet, moneyBudget, currency } = dataForm;

    AddBudget({ title: nameBudet, value: +moneyBudget, currency });
    closeModal();
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.block_title}>Please write budget</h2>
      <form className={styles.block_form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className={styles.block_form_input}
          placeholder="Title"
          name="nameBudet"
          autoComplete="off"
          ref={budgetRef({
            required: true,
            minLength: {
              value: 3,
              message: '⚠ Name must be at least 3 characters long',
            },
            maxLength: 13,
            pattern: /^[\w\S]+$/i,
          })}
        />

        {errors.nameBudet && <p className={styles.text_alert}>{errors.nameBudet.message}</p>}

        <div className={styles.block_input_budget}>
          <input
            type="number"
            className={styles.block_form_input}
            placeholder="Budget"
            name="moneyBudget"
            autoComplete="off"
            ref={budgetRef({
              required: {
                value: true,
                message: '⚠ you must enter a budget',
              },
              maxLength: {
                value: 13,
                message: '⚠ this value exceeds the maximum value',
              },
            })}
          />

          <select
            className={styles.block_form_select}
            name="currency"
            onChange={selectChange}
            ref={budgetRef({ required: true })}
          >
            <option className={styles.option}>{EnumCurrency.RUB}</option>
            <option className={styles.option}>{EnumCurrency.USD}</option>
          </select>
        </div>

        <input value="Submit" type="submit" className={styles.button} />
      </form>
    </div>
  );
};
