import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './BottomMenu.module.scss';
import { useActions } from '../../../../hooks/useActions';
import { EnumCurrency, TCurrency } from '../../../../types/Budget';
import { ICategoryFormatData } from '../../../../store/types/Budget/Budget';
import IconChange from '../../../../assets/svg/changeIcon.svg';
import { TBudgetStatus } from '../types/budget';
interface IProps {
  data: ICategoryFormatData[];
  budgetId: string;
  setBudgetStatus: Dispatch<SetStateAction<TBudgetStatus>>;
}
export const BottomMenu: React.FC<IProps> = ({ data, budgetId, setBudgetStatus }) => {
  const [selectCurrency, setSelectCurrency] = useState<TCurrency>(EnumCurrency.RUB);
  const [budgetInput, setBudgetInput] = useState<string | number>('');
  const [nameInput, setNameInput] = useState<string>('');
  const { AddCategoryBudget, RemoveBudget } = useActions();

  const onChangeSelectCurrency = (e: React.FormEvent<HTMLSelectElement>) =>
    setSelectCurrency(e.currentTarget.value as TCurrency);

  const onChangeInputName = (e: React.FormEvent<HTMLInputElement>) =>
    /^[\wА-я\s]{0,9}$/i.test(e.currentTarget.value) && setNameInput(e.currentTarget.value);

  const onChangeInputBudget = (e: React.FormEvent<HTMLInputElement>) =>
    /^\d{0,13}$/.test(e.currentTarget.value) && setBudgetInput(e.currentTarget.value);

  const setChangeStatusBudget = () => setBudgetStatus('change');

  const indexFreeCategory = data.findIndex((el) => el.name === 'free');

  const onClickRemove = () => RemoveBudget(budgetId);
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const sucsess =
      nameInput.trim().length >= 3 &&
      (budgetInput as string).length > 0 &&
      budgetInput !== '0' &&
      budgetInput <= data[indexFreeCategory].value;
    if (sucsess) {
      const indexFreeCategory = data.findIndex((el) => el.name === 'free');
      const freeCategoryValue = data[indexFreeCategory]['value'] - (budgetInput as number);
      AddCategoryBudget(
        budgetId,
        nameInput.trim(),
        Number.parseInt(budgetInput as string),
        selectCurrency,
        freeCategoryValue
      );
      setNameInput('');
      setBudgetInput('');
      setBudgetStatus('view');
    }
  };
  return (
    <div className={styles.bottom_container}>
      <form className={styles.form} onSubmit={onSubmitForm}>
        <div className={styles.form_title}>
          <h2>Add new Category</h2>
        </div>
        <input
          type="text"
          placeholder="Name of category"
          className={styles.input}
          value={nameInput}
          onChange={onChangeInputName}
        />
        <div className={styles.block_input_number}>
          <input
            type="text"
            placeholder="Category budget"
            className={styles.input}
            value={budgetInput}
            onChange={onChangeInputBudget}
          />
          <select className={styles.select} value={selectCurrency} onChange={onChangeSelectCurrency}>
            <option className={styles.option}>{EnumCurrency.RUB}</option>
            <option className={styles.option}>{EnumCurrency.USD}</option>
            <option className={styles.option}>{EnumCurrency.EUR}</option>
          </select>
        </div>
        <input type="submit" value="Add" className={styles.submit} />
      </form>

      <div className={styles.icon_block}>
        <div className={styles.icon_item} onClick={onClickRemove}>
          <div className={styles.icon_remove}></div>
        </div>
        <div className={styles.icon_item} onClick={setChangeStatusBudget}>
          <IconChange className={styles.change_icon} />
        </div>
        {/* <div className={styles.icon_item}>
          <div className={styles.icon_plus}></div>
        </div> */}
      </div>
    </div>
  );
};
