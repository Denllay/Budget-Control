import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EnumCurrency, ICategoryFormatData, TCurrency } from '@/types/Budget/Budget';
import { AddCategoryColor } from './AddCategoryColor/AddCategoryColor';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { useActions } from '@/hooks/useActions';
import styles from './BudgetAddCategory.module.scss';

type TInputs = {
  nameCategory: string;
  valueCategory: string;
  currency: TCurrency;
};

export const BudgetAddCategory: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<TInputs>();
  const { category, budgetId } = useContext(BudgetBlockContext);
  const { AddCategoryBudget, DeleteBudget } = useActions();
  const [color, setColor] = useState('#c4c4c4');

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setValue('currency', e.target.value);

  const { value: valueFree, currency: currencyFree } = category.find(
    ({ categoryId }) => categoryId === 'free'
  ) as ICategoryFormatData;

  const onSubmit: SubmitHandler<TInputs> = (dataForm) => {
    const { nameCategory, valueCategory, currency } = dataForm;
    const numValueCategory = Number.parseInt(valueCategory);

    const newCategoryValue =
      currencyFree === currency
        ? numValueCategory
        : currencyFree === EnumCurrency.RUB
        ? numValueCategory * 74
        : numValueCategory / 74;

    const sucsess =
      nameCategory.trim().length >= 3 &&
      valueCategory.length > 0 &&
      numValueCategory !== 0 &&
      newCategoryValue <= valueFree;

    if (sucsess) {
      AddCategoryBudget({
        color,
        budgetId,
        name: nameCategory.trim(),
        value: Math.round(newCategoryValue),
        valueFree: Math.round(valueFree - newCategoryValue),
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
            <option className={styles.option}>{EnumCurrency.RUB}</option>
            <option className={styles.option}>{EnumCurrency.USD}</option>
          </select>
        </div>
        <input type="submit" value="Add" className={styles.submit} />
      </form>
      <div className={styles.icon_block}>
        <div className={styles.icon_item} onClick={() => DeleteBudget(budgetId)}>
          <div className={styles.icon_remove}></div>
        </div>
      </div>
    </div>
  );
};
