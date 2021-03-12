import React, { useContext } from 'react';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { BudgetCategoryItem } from './BudgetCategoryItem/BudgetCategoryItem';
import styles from './BudgetCategory.module.scss';
interface IProps {}
export const BudgetCategory: React.FC<IProps> = () => {
  const { category } = useContext(BudgetBlockContext);
  const categoryList = category.map((dataCategory) => (
    <BudgetCategoryItem key={dataCategory.categoryId} data={dataCategory} />
  ));
  return <div className={styles.wrapper}>{categoryList}</div>;
};
