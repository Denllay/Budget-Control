import React, { memo, useContext } from 'react';
import { useActions } from '@/hooks/useActions';
import { BottomForm } from '../BottomForm/BottomForm';
import styles from './AddCategory.module.scss';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { IFormValuesBottomForm, OnSubmitBottomFormFunction } from '@/types/Budget/BottomForm';

const availableIdCategory = 'AvailableMoney';

export const AddCategory: React.FC = memo(() => {
  const { AddCategoryBudget } = useActions();

  const { category, budgetId, budgetIndex } = useContext(BudgetBlockContext);
  const { categoryMoney: availableMoneyCategory, categoryCurrency: budgetCurrency } = category.find(
    ({ categoryId }) => categoryId === availableIdCategory
  )!;

  const onSubmit: OnSubmitBottomFormFunction = ({ categoryMoney, categoryName, categoryColor }) => {
    AddCategoryBudget({
      categoryColor,
      budgetId,
      budgetIndex,
      categoryName,
      categoryMoney: Math.round(categoryMoney),
      categoryAvailableMoney: Math.round(availableMoneyCategory - categoryMoney),
    });
  };

  const initialValues: IFormValuesBottomForm = {
    categoryCurrency: 'RUB',
    categoryMoney: '',
    categoryName: '',
  };

  return (
    <BottomForm
      budgetFormStatus="ADD"
      budgetId={budgetId}
      onsuccessfulFunction={onSubmit} // думаю надо найти более подходящее имя ! Change
      budgetCurrency={budgetCurrency}
      availableMoneyCategory={availableMoneyCategory}
      initialValues={initialValues}
      initialDataColor="#c4c4c4"
    >
      <input type="submit" value="Add" className={styles.submit} />
    </BottomForm>
  );
});
