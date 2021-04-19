import React, { useContext } from 'react';
import { CategoryItem } from './CategoryItem/CategoryItem';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import styles from './CategoryList.module.scss';

export const CategoryList: React.FC = () => {
  const { category } = useContext(BudgetBlockContext);

  const categoryList = category.map((dataCategory) => (
    <CategoryItem dataCategory={dataCategory} key={dataCategory.categoryId} />
  ));

  return <div className={styles.wrapper}>{categoryList}</div>;
};
