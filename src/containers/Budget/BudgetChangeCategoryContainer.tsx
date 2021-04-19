import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { ChangeCategory } from '@/pages/Main/BudgetItem/BottomBlock/ChangeCategory/ChangeCategory';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import React, { useContext } from 'react';

export const BudgetChangeCategoryContainer: React.FC = () => {
  const categoryAvailableMoneyId = 'AvailableMoney';

  const { category, budgetId, budgetIndex } = useContext(BudgetBlockContext);
  const { categoryMoney: availableMoneyCategory, categoryCurrency: budgetCurrency } = category.find(
    ({ categoryId }) => categoryId === categoryAvailableMoneyId
  )!;

  const {
    volatileCategoryName,
    volatileCategoryMoney,
    volatileCategoryId,
    volatileCategoryColor,
    volatileCategoryCurrency,
  } = useTypedSelector((state) => state.volatileBudgets[budgetId]);

  return (
    <ChangeCategory
      availableMoneyCategory={availableMoneyCategory}
      budgetCurrency={budgetCurrency}
      budgetId={budgetId}
      budgetIndex={budgetIndex}
      volatileCategoryName={volatileCategoryName}
      volatileCategoryMoney={volatileCategoryMoney}
      volatileCategoryId={volatileCategoryId}
      volatileCategoryColor={volatileCategoryColor}
      volatileCategoryCurrency={volatileCategoryCurrency!}
    />
  );
};
