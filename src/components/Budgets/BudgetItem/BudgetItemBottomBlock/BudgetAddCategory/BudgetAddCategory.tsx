import React, { useState, memo, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EnumCurrency, TCurrency } from '@/types/Budget/Budget';
import { CategoryColorPick } from '../CategoryColorPick/CategoryColorPick';
import { useActions } from '@/hooks/useActions';
import { ICountNewCategoryMoneyConsideringCurrency, TInputs } from '@/types/Budget/AddBudget';
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

    const { register, handleSubmit, setValue, reset, errors, getValues } = useForm<TInputs>();
    const [color, setColor] = useState('#c4c4c4');

    const checkAvaibleMoneyBudgetOnSubmit = (moneyCategory: string) =>
      countNewCategoryMoneyConsideringCurrency({
        newCategoryCurrency: getValues('currencyCategory'),
        newCategoryMoney: Number.parseInt(moneyCategory),
      }) <= availableMoneyCategory || '⚠  category budget exceeds available funds';

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
      setValue('currencyCategory', e.target.value);

    const countNewCategoryMoneyConsideringCurrency = ({
      newCategoryCurrency,
      newCategoryMoney,
    }: ICountNewCategoryMoneyConsideringCurrency): number => {
      if (newCategoryCurrency === mainBudgetCurrency) return newCategoryMoney;
      return mainBudgetCurrency === EnumCurrency.RUB ? newCategoryMoney * 74 : newCategoryMoney / 74;
    };

    const onSubmit: SubmitHandler<TInputs> = (dataForm) => {
      const {
        newCategoryName: newCategoryName,
        moneyCategory: newCategoryMoney,
        currencyCategory,
      } = dataForm;

      const newCategoryMoneyWithCountCurrency = countNewCategoryMoneyConsideringCurrency({
        newCategoryCurrency: currencyCategory,
        newCategoryMoney: Number.parseInt(newCategoryMoney),
      });

      AddCategoryBudget({
        color,
        budgetId,
        budgetIndex,
        name: newCategoryName.trim(),
        value: Math.round(newCategoryMoneyWithCountCurrency),
        availableMoneyCategory: Math.round(availableMoneyCategory - newCategoryMoneyWithCountCurrency),
      });
      reset();
      setColor('#c4c4c4');
    };

    return (
      <div className={styles.bottom_container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_title}>
            <h2>Add new Category</h2>
          </div>

          <div className={styles.block_input_name}>
            <div>
              <input
                type="text"
                placeholder="Category name"
                name="newCategoryName"
                autoComplete="off"
                className={styles.input}
                ref={register({
                  required: true,
                  minLength: {
                    value: 3,
                    message: '⚠ you must enter at least 3 characters',
                  },
                  maxLength: 9,
                })}
              />
              {errors.newCategoryName && (
                <p className={styles.text_alert}>{errors.newCategoryName.message}</p>
              )}
            </div>
            <CategoryColorPick color={color} setColor={setColor} />
          </div>

          <div className={styles.block_input_number}>
            <div>
              <input
                type="number"
                placeholder="Category money"
                name="moneyCategory"
                autoComplete="off"
                className={`${styles.input} ${styles.input_number}`}
                ref={register({
                  required: {
                    value: true,
                    message: '⚠ you must enter a budget',
                  },
                  validate: (moneyCategory) => checkAvaibleMoneyBudgetOnSubmit(moneyCategory),
                  maxLength: 13,
                })}
              />

              {errors.moneyCategory && <p className={styles.text_alert}>{errors.moneyCategory.message}</p>}
            </div>
            <select className={styles.select} name="currencyCategory" onChange={selectChange} ref={register}>
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
