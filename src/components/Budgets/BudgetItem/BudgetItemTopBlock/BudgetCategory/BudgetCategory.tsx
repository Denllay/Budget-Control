import React, { useContext, useMemo } from 'react';
import styles from './BudgetCategory.module.scss';
import { BudgetCategoryItemContainer } from '@/containers/Budget/BudgetCategoryItemContainer';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';

export const BudgetCategory: React.FC = () => {
  const { category } = useContext(BudgetBlockContext);
  const categoryList = useMemo(
    () =>
      category.map((dataCategory) => (
        <BudgetCategoryItemContainer key={dataCategory.categoryId} categoryData={dataCategory} />
      )),
    [category]
  );
  return <div className={styles.wrapper}>{categoryList}</div>;
};
