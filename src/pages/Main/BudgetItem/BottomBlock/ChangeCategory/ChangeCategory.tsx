import React, { useContext } from 'react';
import { useActions } from '@/hooks/useActions';
import { BottomForm } from '../BottomForm/BottomForm';
import { onSubmitFormBottomMenuFunction } from '@/types/Budget/BudgetBottomForm';
import styles from './ChangeCategory.module.scss';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const categoryAvailableMoneyId = 'AvailableMoney';

export const ChangeCategory = () => {
  const { ClearVolatileData, ChangeDataCategory } = useActions();

  const { category, budgetId, budgetIndex } = useContext(BudgetBlockContext);
  const { categoryMoney: availableMoneyCategory, categoryCurrency: budgetCurrency } = category.find(
    ({ categoryId }) => categoryId === categoryAvailableMoneyId
  )!;

  const { volatileCategoryMoney, volatileCategoryCurrency, ...volatileData } = useTypedSelector(
    (state) => state.volatileBudgets[budgetId]
  );

  const clearVolatileData = () => ClearVolatileData(budgetId);

  const onSubmit: onSubmitFormBottomMenuFunction = ({ categoryName, categoryMoney, categoryColor }) => {
    ChangeDataCategory({
      budgetIndex,
      budgetId,
      categoryMoney,
      categoryName,
      categoryColor,
      volatileCategoryId: volatileData.volatileCategoryId,
      categoryAvailableMoney: availableMoneyCategory + (volatileCategoryMoney - categoryMoney),
    });
  };

  return (
    <BottomForm
      budgetFormStatus="CHNAGE"
      availableMoneyCategory={availableMoneyCategory}
      budgetCurrency={budgetCurrency}
      budgetId={budgetId}
      onSubmit={onSubmit}
      {...volatileData}
      volatileCategoryCurrency={volatileCategoryCurrency!}
      volatileCategoryMoney={volatileCategoryMoney}
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
