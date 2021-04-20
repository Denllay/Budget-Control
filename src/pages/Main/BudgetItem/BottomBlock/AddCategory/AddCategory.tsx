import React, { memo, useContext, useRef, useState } from 'react';
import { TCurrency } from '@/types/Budget/Budget';
import { useActions } from '@/hooks/useActions';
import { BottomForm } from '../BottomForm/BottomForm';
import { onSubmitFormBottomMenuFunction } from '@/types/Budget/BudgetBottomForm';
import styles from './AddCategory.module.scss';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { useForm } from 'react-hook-form';
import { TInputsCategory } from '@/types/Budget/AddBudget';
import { useCountMoneyConsideringCurrency } from '@/hooks/useCountMoneyConsideringCurrency';

const availableIdCategory = 'AvailableMoney';

export const AddCategory: React.FC = memo(() => {
  const countMoneyConsideringCurrency = useCountMoneyConsideringCurrency();
  const { AddCategoryBudget } = useActions();

  const [categoryColor, setCategoryColor] = useState('#c4c4c4');

  const { category, budgetId, budgetIndex } = useContext(BudgetBlockContext);
  const { categoryMoney: availableMoneyCategory, categoryCurrency: budgetCurrency } = category.find(
    ({ categoryId }) => categoryId === availableIdCategory
  )!;

  const { register, handleSubmit, setValue, reset, errors, watch } = useForm<TInputsCategory>();

  const categoryMoney = watch('categoryMoney');
  const categoryCurrency = watch('currencyCategory');

  const categoryMoneyConsideringCurrency = countMoneyConsideringCurrency({
    categoryMoney,
    categoryCurrency,
    budgetCurrency,
  });

  const onSubmit = handleSubmit(({ categoryName }) => {
    AddCategoryBudget({
      categoryColor,
      budgetId,
      budgetIndex,
      categoryName,
      categoryMoney: Math.round(categoryMoneyConsideringCurrency),
      categoryAvailableMoney: Math.round(availableMoneyCategory - categoryMoneyConsideringCurrency),
    });
    reset();
    setCategoryColor('#c4c4c4');
  });

  const checkCategoryMaxMoney = () => {
    return (
      categoryMoneyConsideringCurrency <= availableMoneyCategory ||
      '⚠  category budget exceeds available funds'
    );
  };

  return (
    <BottomForm
      budgetFormStatus="ADD"
      budgetId={budgetId}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setValue={setValue}
      categoryColor={categoryColor}
      setCategoryColor={setCategoryColor}
      checkCategoryMaxMoney={checkCategoryMaxMoney}
    >
      <input type="submit" value="Add" className={styles.submit} />
    </BottomForm>
  );
});
