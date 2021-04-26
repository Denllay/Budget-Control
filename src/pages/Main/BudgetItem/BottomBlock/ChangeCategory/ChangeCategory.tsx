import React, { useContext } from 'react';
import { useActions } from '@/hooks/useActions';
import { BottomForm } from '../BottomForm/BottomForm';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IFormValuesBottomForm, OnSubmitBottomFormFunction } from '@/types/Budget/BottomForm';
import { Button } from '@/components/UIKit';
import styles from './ChangeCategory.module.scss';

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
      onSuccessfulFunction={onSubmit}
      availableMoneyCategory={availableMoneyCategory}
      budgetCurrency={budgetCurrency}
      initialValues={initialValues}
      initialDataColor={volatileCategoryColor}
    >
      <div className={styles.button_block}>
        <Button theme="green" type="submit" className={styles.button}>
          Cancel
        </Button>

        <Button onClick={clearVolatileData} theme="red" className={styles.button}>
          Cancel
        </Button>
      </div>
    </BottomForm>
  );
};
