import React, { useState, memo, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EnumCurrency, TCurrency } from '@/types/Budget/Budget';
import { CategoryColorPick } from '../CategoryColorPick/CategoryColorPick';
import { useActions } from '@/hooks/useActions';

import {
  ICountNewCategoryMoneyConsideringCurrency,
  IDiscoverSucsessForm,
  TInputs,
} from '@/types/Budget/AddBudget';
import styles from './BudgetAddCategory.module.scss';
import { CreateConfirmDialogModal } from '@/utilities/CreateConfirmDialogModal/CreateConfirmDialogModal';
interface IProps {
  availableMoneyCategory: number;
  mainBudgetCurrency: TCurrency;
  budgetId: string;
  budgetIndex: number;
}

export const BudgetAddCategory: React.FC<IProps> = memo(
  ({ availableMoneyCategory, mainBudgetCurrency, budgetId, budgetIndex }) => {
    const { AddCategoryBudget, DeleteBudget } = useActions();
    const onDeleteBudget = () => DeleteBudget(budgetId);

    const { toggleModal, ConfirmDialogModal } = CreateConfirmDialogModal({
      titleText: 'Delete budget',
      onConfirmClick: onDeleteBudget,
    });

    const { register, handleSubmit, setValue } = useForm<TInputs>();
    const [color, setColor] = useState('#c4c4c4');

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setValue('currency', e.target.value);

    const countNewCategoryMoneyConsideringCurrency = ({
      mainBudgetCurrency,
      newCategoryCurrency,
      newCategoryMoney,
    }: ICountNewCategoryMoneyConsideringCurrency): number => {
      if (newCategoryCurrency === mainBudgetCurrency) return newCategoryMoney;
      return mainBudgetCurrency === EnumCurrency.RUB ? newCategoryMoney * 74 : newCategoryMoney / 74;
    };

    const discoverSucsessForm = ({
      newCategoryMoneyWithCountCurrency,
      newCategoryName,
    }: IDiscoverSucsessForm) =>
      newCategoryName.trim().length >= 3 &&
      newCategoryMoneyWithCountCurrency !== 0 &&
      newCategoryMoneyWithCountCurrency <= availableMoneyCategory;

    const onSubmit: SubmitHandler<TInputs> = (dataForm) => {
      const {
        nameCategory: newCategoryName,
        valueCategory: newCategoryMoney,
        currency: newCategoryCurrency,
      } = dataForm;

      const newCategoryMoneyWithCountCurrency = countNewCategoryMoneyConsideringCurrency({
        mainBudgetCurrency,
        newCategoryCurrency,
        newCategoryMoney: Number.parseInt(newCategoryMoney),
      });

      const sucsess = discoverSucsessForm({ newCategoryMoneyWithCountCurrency, newCategoryName });

      if (sucsess) {
        AddCategoryBudget({
          color,
          budgetId,
          budgetIndex,
          name: newCategoryName.trim(),
          value: Math.round(newCategoryMoneyWithCountCurrency),
          availableMoneyCategory: Math.round(availableMoneyCategory - newCategoryMoneyWithCountCurrency),
        });

        setValue('nameCategory', '');
        setValue('valueCategory', '');
        setColor('#c4c4c4');
      }
    };

    return (
      <div className={styles.bottom_container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_title}>
            <h2>Add new Category</h2>
          </div>
          <div className={styles.block_input_name}>
            <input
              type="text"
              placeholder="Category name"
              name="nameCategory"
              className={styles.input}
              ref={register({ required: true, minLength: 3, maxLength: 9 })}
            />
            <CategoryColorPick color={color} setColor={setColor} />
          </div>
          <div className={styles.block_input_number}>
            <input
              type="number"
              placeholder="Category money"
              name="valueCategory"
              className={`${styles.input} ${styles.input_number}`}
              ref={register({ required: true, minLength: 1, maxLength: 13 })}
            />
            <select className={styles.select} name="currency" onChange={selectChange} ref={register}>
              <option className={styles.option}>RUB</option>
              <option className={styles.option}>USD</option>
            </select>
          </div>
          <input type="submit" value="Add" className={styles.submit} />
        </form>
        <div className={styles.icon_block}>
          <div className={styles.icon_item} onClick={toggleModal}>
            <div className={styles.icon_remove}></div>
          </div>
        </div>
        {ConfirmDialogModal}
      </div>
    );
  }
);
