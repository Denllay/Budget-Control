import React, { useContext, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { BottomForm } from '../BottomForm/BottomForm';
import styles from './ChangeCategory.module.scss';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useCountMoneyConsideringCurrency } from '@/hooks/useCountMoneyConsideringCurrency';
import { IFormValuesBottomForm, OnSubmitBottomFormFunction } from '@/types/Budget/BottomForm';

const categoryAvailableMoneyId = 'AvailableMoney';

export const ChangeCategory = () => {
  const { ClearVolatileData, ChangeDataCategory } = useActions();

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

  const clearVolatileData = () => ClearVolatileData(budgetId);

  const onSubmit: OnSubmitBottomFormFunction = ({ categoryName, categoryMoney, categoryColor }) => {
    ChangeDataCategory({
      budgetIndex,
      budgetId,
      categoryMoney: +categoryMoney,
      categoryName,
      categoryColor,
      volatileCategoryId: volatileCategoryId,
      categoryAvailableMoney: availableMoneyCategory + (volatileCategoryMoney - +categoryMoney),
    });
  };

  const initialValues: IFormValuesBottomForm = {
    categoryCurrency: volatileCategoryCurrency!,
    categoryMoney: String(volatileCategoryMoney),
    categoryName: volatileCategoryName,
  };

  return (
    <BottomForm
      budgetFormStatus="CHANGE"
      budgetId={budgetId}
      onsuccessfulFunction={onSubmit}
      availableMoneyCategory={availableMoneyCategory}
      budgetCurrency={budgetCurrency}
      initialValues={initialValues}
      initialDataColor={volatileCategoryColor}
    >
      <div className={styles.button_block}>
        <button type="submit" className={styles.button_item}>
          Submit
        </button>
        <button type="button" className={`${styles.button_item} ${styles.button_cancel}`} onClick={clearVolatileData}>
          Cancel
        </button>
      </div>
    </BottomForm>
  );
};
