import React from 'react';
import { ICategoryFormatData } from '@/types/Budget/Budget';
import styles from './BudgetCategoryItem.module.scss';
import { BudgetCategoryButton } from './BudgetCategoryButton/BudgetCategoryButton';
interface IProps {
  budgetSum: number;
  categoryData: ICategoryFormatData;
  budgetIsChange: boolean;
}
export const BudgetCategoryItem: React.FC<IProps> = ({ categoryData, budgetSum, budgetIsChange }) => {
  const { categoryColor, categoryName, categoryMoney, categoryId, categoryCurrency } = categoryData;

  const availableIdCategory = 'AvailableMoney';
  const procentCategory = (categoryMoney / (budgetSum / 100)).toFixed(1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.block_name}>
        <div className={styles.color} style={{ background: categoryColor }}></div>
        <span className={styles.name} style={{ color: categoryColor }}>
          {categoryName}
        </span>
      </div>
      <div className={styles.block_procent}>
        <span style={{ color: categoryColor }}>{`${procentCategory}%`}</span>
      </div>

      {!budgetIsChange && categoryId !== availableIdCategory && (
        <BudgetCategoryButton
          categoryId={categoryId}
          categoryName={categoryName}
          categoryColor={categoryColor}
          categoryMoney={categoryMoney}
          categoryCurrency={categoryCurrency}
        />
      )}
    </div>
  );
};
