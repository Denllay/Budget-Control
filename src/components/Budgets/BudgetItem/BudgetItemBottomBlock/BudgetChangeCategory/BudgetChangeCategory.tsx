import React from 'react';
import { useActions } from '@/hooks/useActions';
import { BudgetBottomForm } from '../BudgetBottomForm/BudgetBottomForm';
import { TCurrency } from '@/types/Budget/Budget';
import { onSubmitFormBottomMenuFunction } from '@/types/Budget/BudgetBottomForm';
import styles from './BudgetChangeCategory.module.scss';
interface IProps {
  availableMoneyCategory: number;
  budgetCurrency: TCurrency;
  budgetId: string;
  budgetIndex: number;

  volatileCategoryName: string;
  volatileCategoryMoney: number;
  volatileCategoryId: string;
  volatileCategoryColor: string;
  volatileCategoryCurrency: TCurrency;
}

export const BudgetChangeCategory: React.FC<IProps> = ({
  availableMoneyCategory,
  budgetCurrency,
  budgetId,
  budgetIndex,

  volatileCategoryName,
  volatileCategoryMoney,
  volatileCategoryId,
  volatileCategoryColor,
  volatileCategoryCurrency,
}) => {
  const { ClearVolatileData, ChangeDataCategory } = useActions();

  const clearVolatileData = () => ClearVolatileData(budgetId);

  const onSubmit: onSubmitFormBottomMenuFunction = ({ categoryName, categoryMoney, categoryColor }) => {
    ChangeDataCategory({
      budgetIndex,
      budgetId,
      categoryMoney,
      categoryName,
      categoryColor,
      volatileCategoryId,
      categoryAvailableMoney: availableMoneyCategory + (volatileCategoryMoney - categoryMoney),
    });
  };

  return (
    <BudgetBottomForm
      budgetFormStatus="CHNAGE"
      availableMoneyCategory={availableMoneyCategory}
      budgetCurrency={budgetCurrency}
      budgetId={budgetId}
      onSubmit={onSubmit}
      volatileCategoryCurrency={volatileCategoryCurrency}
      volatileCategoryName={volatileCategoryName}
      volatileCategoryColor={volatileCategoryColor}
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
    </BudgetBottomForm>
  );
};
