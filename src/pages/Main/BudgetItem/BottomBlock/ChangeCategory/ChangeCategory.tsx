import React, { useContext, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { BottomForm } from '../BottomForm/BottomForm';
import { onSubmitFormBottomMenuFunction } from '@/types/Budget/BudgetBottomForm';
import styles from './ChangeCategory.module.scss';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { TInputsCategory } from '@/types/Budget/AddBudget';
import { useForm } from 'react-hook-form';
import { useCountMoneyConsideringCurrency } from '@/hooks/useCountMoneyConsideringCurrency';

const categoryAvailableMoneyId = 'AvailableMoney';

export const ChangeCategory = () => {
  const { ClearVolatileData, ChangeDataCategory } = useActions();
  const countMoneyConsideringCurrency = useCountMoneyConsideringCurrency();

  const { category, budgetId, budgetIndex } = useContext(BudgetBlockContext);
  const { categoryMoney: availableMoneyCategory, categoryCurrency: budgetCurrency } = category.find(
    ({ categoryId }) => categoryId === categoryAvailableMoneyId
  )!;

  const {
    volatileCategoryMoney,
    volatileCategoryCurrency,
    volatileCategoryName,
    volatileCategoryId,
    volatileCategoryColor,
  } = useTypedSelector((state) => state.volatileBudgets[budgetId]);

  const [categoryColor, setCategoryColor] = useState(volatileCategoryColor);

  const clearVolatileData = () => ClearVolatileData(budgetId);

  const { register, handleSubmit, setValue, reset, errors, watch } = useForm<TInputsCategory>({
    defaultValues: {
      categoryMoney: volatileCategoryMoney,
      categoryName: volatileCategoryName,
      currencyCategory: volatileCategoryCurrency!,
    },
  });

  const categoryMoneyConsideringCurrency = countMoneyConsideringCurrency({
    categoryMoney: volatileCategoryMoney,
    categoryCurrency: volatileCategoryCurrency!,
    budgetCurrency,
  });

  const onSubmit = handleSubmit(({ categoryName, categoryMoney }) => {
    ChangeDataCategory({
      budgetIndex,
      budgetId,
      categoryMoney,
      categoryName,
      categoryColor,
      volatileCategoryId: volatileCategoryId,
      categoryAvailableMoney: availableMoneyCategory + (volatileCategoryMoney - categoryMoney),
    });
  });

  const checkCategoryMaxMoney = () => {
    return (
      categoryMoneyConsideringCurrency <= availableMoneyCategory ||
      '⚠  category budget exceeds available funds'
    );
  };

  return (
    <BottomForm
      budgetFormStatus="CHANGE"
      budgetId={budgetId}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setValue={setValue}
      categoryColor={categoryColor}
      setCategoryColor={setCategoryColor}
      checkCategoryMaxMoney={checkCategoryMaxMoney}
    >
      <div className={styles.button_block}>
        <button type="submit" className={styles.button_item}>
          Submit
        </button>
        <button
          type="button"
          className={`${styles.button_item} ${styles.button_cancel}`}
          onClick={clearVolatileData}
        >
          Cancel
        </button>
      </div>
    </BottomForm>
  );
};
