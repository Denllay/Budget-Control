import React, { useEffect } from 'react';
import { useActions } from '../../../hooks/useActions';
import { TCurrency, EnumCurrency } from '../../../types/Budget';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from 'react-modal';
import styles from './AddBudgetModal.module.scss';
interface IProps {
  statusModal: boolean;
}
type TInputs = {
  nameBudet: string;
  valueBudget: string;
  currency: TCurrency;
};

export const AddBudgetModal: React.FC<IProps> = ({ statusModal }) => {
  const { CloseModal, AddBudget } = useActions();
  //
  const { register, handleSubmit, setValue } = useForm<TInputs>();
  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setValue('currency', e.target.value);
  const onSubmit: SubmitHandler<TInputs> = (dataForm) => {
    const { nameBudet, valueBudget, currency } = dataForm;
    const numValueBudget = Number.parseInt(valueBudget);
    if (nameBudet.trim() && numValueBudget > 0) {
      AddBudget({ title: nameBudet, value: numValueBudget, currency });
      CloseModal();
    } else {
      console.log('Введите данные верно!'); //Change
    }
  };
  Modal.setAppElement('#root');
  return (
    <div className={styles.wrapper}>
      <Modal
        closeTimeoutMS={500}
        isOpen={statusModal}
        onRequestClose={CloseModal}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            zIndex: 100,
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#535763',
            border: 'none',
            width: '45vw',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.title}>Please write budget</h2>
          <input
            type="text"
            className={styles.input_title}
            placeholder="Title"
            name="nameBudet"
            ref={register({ required: true, minLength: 3, maxLength: 13 })}
          />
          <div className={styles.block_input_budget}>
            <input type="number" className={styles.input} placeholder="Budget" name="valueBudget" ref={register} />
            <select
              className={styles.select}
              name="currency"
              onChange={selectChange}
              ref={register({ required: true, maxLength: 13 })}
            >
              <option className={styles.option}>{EnumCurrency.RUB}</option>
              <option className={styles.option}>{EnumCurrency.USD}</option>
            </select>
          </div>

          <input value="Submit" type="submit" className={styles.button} />
        </form>
      </Modal>
    </div>
  );
};
