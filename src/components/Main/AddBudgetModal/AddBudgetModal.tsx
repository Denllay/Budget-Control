import React, { useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import { TCurrency, EnumCurrency } from '../../../types/Budget';
import styles from './AddBudgetModal.module.scss';
interface IProps {}
export const AddBudgetModal: React.FC<IProps> = () => {
  const { ShowAddBudget, AddBudget } = useActions();
  const [budgetInput, setBudgetInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [selectCurrency, setSelectCurrency] = useState<TCurrency>(EnumCurrency.RUB);
  const onChangeInputBudget = (e: React.FormEvent<HTMLInputElement>) =>
    /^\d{0,13}$/.test(e.currentTarget.value) && setBudgetInput(e.currentTarget.value);
  const onChangeSelectCurrency = (e: React.FormEvent<HTMLSelectElement>) =>
    setSelectCurrency(e.currentTarget.value as TCurrency);
  const onCloseMenu = () => ShowAddBudget();
  const onChangeInputTitle = (e: React.FormEvent<HTMLInputElement>) =>
    /^[\wА-я]{0,20}$/i.test(e.currentTarget.value) && setTitleInput(e.currentTarget.value);
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!!titleInput.trim() && Number.parseInt(budgetInput) > 0) {
      AddBudget({ title: titleInput, value: Number.parseInt(budgetInput), currency: selectCurrency });
      ShowAddBudget();
    } else {
      console.log('Введите данные верно!'); //Change
    }
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.container} onSubmit={onSubmitForm}>
        <div className={styles.close} onClick={onCloseMenu}></div>
        <h2 className={styles.title}>Please write budget</h2>
        <input
          type="text"
          className={styles.input_title}
          placeholder="Title"
          value={titleInput}
          onChange={onChangeInputTitle}
        />
        <div className={styles.block_input_budget}>
          <input
            type="text"
            className={styles.input}
            placeholder="Budget"
            value={budgetInput}
            onChange={onChangeInputBudget}
          />
          <select className={styles.select} value={selectCurrency} onChange={onChangeSelectCurrency}>
            <option className={styles.option}>{EnumCurrency.RUB}</option>
            <option className={styles.option}>{EnumCurrency.USD}</option>
          </select>
        </div>

        <input value="Submit" type="submit" className={styles.button} />
      </form>
    </div>
  );
};
