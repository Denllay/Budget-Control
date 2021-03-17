import React, { useState, memo, useEffect, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EnumCurrency, TCurrency } from '@/types/Budget/Budget';
import { AddCategoryColor } from './AddCategoryColor/AddCategoryColor';
import { useActions } from '@/hooks/useActions';
import styles from './BudgetAddCategory.module.scss';
import useConfirmationDialog from '@/hooks/useConfirmDialog';
interface IProps {
  valueCategoryFree: number;
  currencyCategoryFree: TCurrency;
  budgetId: string;
  budgetIndex: number;
}
type TInputs = {
  nameCategory: string;
  valueCategory: string;
  currency: TCurrency;
};

export const BudgetAddCategory: React.FC<IProps> = memo(
  ({ valueCategoryFree, currencyCategoryFree, budgetId, budgetIndex }) => {
    const { AddCategoryBudget, DeleteBudget } = useActions();
    const onDeleteBudget = () => DeleteBudget(budgetId);
    const { Dialog, onOpen } = useConfirmationDialog({
      headerText: 'Do u confirm delete budget',
      onConfirmClick: onDeleteBudget,
    });
    useEffect(() => {
      console.log('RENDER ADD CATEGORY');
    }, [onOpen]);
    const { register, handleSubmit, setValue } = useForm<TInputs>();
    const [color, setColor] = useState('#c4c4c4');

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setValue('currency', e.target.value);

    const onSubmit: SubmitHandler<TInputs> = (dataForm) => {
      const { nameCategory, valueCategory, currency } = dataForm;
      const numValueCategory = Number.parseInt(valueCategory);

      const newCategoryValue =
        currencyCategoryFree === currency
          ? numValueCategory
          : currencyCategoryFree === EnumCurrency.RUB
          ? numValueCategory * 74
          : numValueCategory / 74;

      const sucsess =
        nameCategory.trim().length >= 3 &&
        valueCategory.length > 0 &&
        numValueCategory !== 0 &&
        newCategoryValue <= valueCategoryFree;

      if (sucsess) {
        AddCategoryBudget({
          color,
          budgetId,
          budgetIndex,
          name: nameCategory.trim(),
          value: Math.round(newCategoryValue),
          freeCategoryValue: Math.round(valueCategoryFree - newCategoryValue),
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
              placeholder="Name of category"
              name="nameCategory"
              className={styles.input}
              ref={register({ required: true, minLength: 3, maxLength: 9 })}
            />
            <AddCategoryColor color={color} setColor={setColor} />
          </div>
          <div className={styles.block_input_number}>
            <input
              type="number"
              placeholder="Category budget"
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
          <div className={styles.icon_item} onClick={() => onOpen()}>
            <div className={styles.icon_remove}></div>
          </div>
        </div>
        <Dialog />
      </div>
    );
  }
);
