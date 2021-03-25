import React from 'react';
import { useActions } from '../../../../hooks/useActions';
import { TCurrency, EnumCurrency } from '../../../../types/Budget/Budget';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './AddBudgetModal.module.scss';
import { IPropsModalComponent } from '@/types/Modal';

type TInputs = {
  nameBudet: string;
  valueBudget: string;
  currency: TCurrency;
};

export const AddBudgetModal: React.FC<IPropsModalComponent> = ({ closeModal }) => {
  const { AddBudget } = useActions();
  const { register: budget, handleSubmit, setValue } = useForm<TInputs>();

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setValue('currency', e.target.value);

  const onSubmit: SubmitHandler<TInputs> = (dataForm) => {
    const { nameBudet, valueBudget, currency } = dataForm;
    const numValueBudget = Number.parseInt(valueBudget);

    if (nameBudet.trim() && numValueBudget > 0) {
      AddBudget({ title: nameBudet, value: numValueBudget, currency });
      closeModal();
    } else {
      console.log('Введите данные верно!');
    }
  };

  return (
    <div className={styles.content} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      <h2 className={styles.block_title}>Please write budget</h2>
      <form className={styles.block_form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className={styles.block_form_input}
          placeholder="Title"
          name="nameBudet"
          autoComplete="off"
          ref={budget({ required: true, minLength: 3, maxLength: 13 })}
        />
        <div className={styles.block_input_budget}>
          <input
            type="number"
            className={styles.block_form_input}
            placeholder="Budget"
            name="valueBudget"
            autoComplete="off"
            ref={budget}
          />
          <select
            className={styles.block_form_select}
            name="currency"
            onChange={selectChange}
            ref={budget({ required: true, maxLength: 13 })}
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
