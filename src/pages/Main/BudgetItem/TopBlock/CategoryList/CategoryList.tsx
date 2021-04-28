import React, { useContext } from 'react';
import { CategoryItem } from './CategoryItem/CategoryItem';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import styles from './CategoryList.module.scss';
import { useTypedSelector } from '@/hooks/useTypedSelector';

export const CategoryList: React.FC = () => {
  const { budgetIndex } = useContext(BudgetBlockContext);
  const { category } = useTypedSelector((state) => state.budgets.budgetsData[budgetIndex]);

  const categoryList = category.map((dataCategory) => (
    <CategoryItem dataCategory={dataCategory} key={dataCategory.categoryId} />
  ));

  return <div className={styles.wrapper}>{categoryList}</div>;
};
