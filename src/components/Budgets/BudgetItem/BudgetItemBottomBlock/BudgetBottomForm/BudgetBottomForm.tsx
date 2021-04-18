import React, { memo, useRef, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { CreateConfirmDialogModal } from '@/utilities/CreateConfirmDialogModal/CreateConfirmDialogModal';
import { useForm } from 'react-hook-form';
import { TInputsCategory } from '@/types/Budget/AddBudget';

import { EnumCurrency, TCurrency } from '@/types/Budget/Budget';
import { CategoryColorPick } from '../CategoryColorPick/CategoryColorPick';
import { onSubmitFormBottomMenuFunction } from '@/types/Budget/BudgetBottomForm';
import styles from './BudgetBottomForm.module.scss';
import { useCountMoneyConsideringCurrency } from '@/hooks/useCountMoneyConsideringCurrency';

interface IProps {
  budgetId: string;
  availableMoneyCategory: number;
  budgetCurrency: TCurrency;
  budgetFormStatus: 'CHNAGE' | 'ADD';
  onSubmit: onSubmitFormBottomMenuFunction;

  volatileCategoryName?: string;
  volatileCategoryMoney?: number;
  volatileCategoryColor?: string;
  volatileCategoryCurrency?: TCurrency;
}
export const BudgetBottomForm: React.FC<IProps> = memo(
  ({
    budgetId,
    children,
    budgetFormStatus,
    availableMoneyCategory,
    budgetCurrency,
    onSubmit,

    volatileCategoryColor = '#c4c4c4',
    volatileCategoryName = '',
    volatileCategoryMoney = '',
    volatileCategoryCurrency = EnumCurrency.RUB,
  }) => {
    const [categoryColor, setCategoryColor] = useState(volatileCategoryColor);
    const { DeleteBudget } = useActions();
    const { register: categoryRef, handleSubmit, setValue, reset, errors, watch } = useForm<TInputsCategory>({
      defaultValues: {
        categoryMoney: volatileCategoryMoney as number,
        categoryName: volatileCategoryName,
        currencyCategory: volatileCategoryCurrency,
      },
    });
    const categoryMoney = useRef({});
    categoryMoney.current = watch('categoryMoney');
    const categoryCurrency = useRef({});
    categoryCurrency.current = watch('currencyCategory');

    const { countMoneyConsideringCurrency } = useCountMoneyConsideringCurrency();

    const categoryMoneyConsideringCurrency = countMoneyConsideringCurrency({
      categoryMoney: categoryMoney.current as number,
      currencyCategory:
        budgetFormStatus === 'CHNAGE' ? volatileCategoryCurrency : (categoryCurrency.current as TCurrency),
      budgetCurrency,
    });

    const checkValidCategory = (): boolean | string => {
      const avaibleMoneyConsideringtatusTheForm =
        budgetFormStatus === 'CHNAGE'
          ? availableMoneyCategory + (volatileCategoryMoney as number)
          : availableMoneyCategory;
      return (
        categoryMoneyConsideringCurrency <= avaibleMoneyConsideringtatusTheForm ||
        '⚠  category budget exceeds available funds'
      );
    };

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
      setValue('currencyCategory', e.target.value);

    const onSubmitForm = handleSubmit(({ categoryName }) => {
      onSubmit({ categoryMoney: categoryMoneyConsideringCurrency, categoryColor, categoryName });
      if (budgetFormStatus === 'ADD') {
        reset();
        setCategoryColor('#c4c4c4');
      }
    });

    const { toggleModal, ConfirmDialogModal } = CreateConfirmDialogModal({
      titleText: 'Delete budget',
      onConfirmClick: () => DeleteBudget(budgetId),
    });

    return (
      <>
        <div className={styles.bottom_container}>
          <form className={styles.form} onSubmit={onSubmitForm}>
            <div className={styles.form_title}>
              <h2>Add new Category</h2>
            </div>

            <div className={styles.block_input_name}>
              <div>
                <input
                  type="text"
                  placeholder="Category name"
                  name="categoryName"
                  autoComplete="off"
                  className={styles.input}
                  ref={categoryRef!({
                    required: true,
                    minLength: {
                      value: 3,
                      message: '⚠ you must enter at least 3 characters',
                    },
                    maxLength: {
                      value: 9,
                      message: '⚠ category name must be no more than 9 characters',
                    },
                    pattern: /^[\w\S]+$/i,
                  })}
                />
                {errors!.categoryName && <p className={styles.text_alert}>{errors!.categoryName.message}</p>}
              </div>
              <CategoryColorPick color={categoryColor} setColor={setCategoryColor} />
            </div>

            <div className={styles.block_input_number}>
              <div>
                <input
                  type="number"
                  placeholder="Category money"
                  name="categoryMoney"
                  autoComplete="off"
                  className={`${styles.input} ${styles.input_number}`}
                  ref={categoryRef!({
                    required: {
                      value: true,
                      message: '⚠ you must enter a budget',
                    },
                    maxLength: {
                      value: 13,
                      message: '⚠ this value exceeds the maximum value',
                    },
                    valueAsNumber: true,
                    validate: checkValidCategory,
                  })}
                />

                {errors!.categoryMoney && (
                  <p className={styles.text_alert}>{errors!.categoryMoney.message}</p>
                )}
              </div>
              {budgetFormStatus === 'ADD' && (
                <select
                  className={styles.select}
                  name="currencyCategory"
                  onChange={selectChange}
                  ref={categoryRef}
                >
                  <option className={styles.option}>RUB</option>
                  <option className={styles.option}>USD</option>
                </select>
              )}
            </div>
            {children}
          </form>

          <div className={styles.icon_block}>
            <div className={styles.icon_item} onClick={toggleModal}>
              <div className={styles.icon_remove}></div>
            </div>
          </div>
        </div>
        {ConfirmDialogModal}
      </>
    );
  }
);
