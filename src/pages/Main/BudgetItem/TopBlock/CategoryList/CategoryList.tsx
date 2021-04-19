import React, { useContext } from 'react';
import styles from './CategoryList.module.scss';
import { BudgetCategoryItemContainer } from '@/containers/Budget/BudgetCategoryItemContainer';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';

export const CategoryList: React.FC = () => {
  const { category } = useContext(BudgetBlockContext);

  const categoryList = category.map((dataCategory) => (
    <BudgetCategoryItemContainer key={dataCategory.categoryId} categoryData={dataCategory} />
  ));

  return <div className={styles.wrapper}>{categoryList}</div>;
};
