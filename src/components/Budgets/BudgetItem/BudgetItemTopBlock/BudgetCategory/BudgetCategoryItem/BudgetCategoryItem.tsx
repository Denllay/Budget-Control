import React, { useEffect } from 'react';
import { ICategoryFormatData } from '@/types/Budget/Budget';
import styles from './BudgetCategoryItem.module.scss';
import { BudgetCategoryButton } from './BudgetCategoryButton/BudgetCategoryButton';
interface IProps {
  budgetSum: number;
  categoryData: ICategoryFormatData;
  budgetIsChange: boolean;
}
export const BudgetCategoryItem: React.FC<IProps> = ({ categoryData, budgetSum, budgetIsChange }) => {
  const { color, name, value, categoryId } = categoryData;
  const availableIdCategory = 'AvailableMoney';
  const procentCategory = (value / (budgetSum / 100)).toFixed(1);
  useEffect(() => {
    console.log('RENDER CATEGORYITEM');
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.block_name}>
        <div className={styles.color} style={{ background: color }}></div>
        <span className={styles.name} style={{ color }}>
          {name}
        </span>
      </div>
      <div className={styles.block_procent}>
        <span style={{ color }}>{`${procentCategory}%`}</span>
      </div>

      {!budgetIsChange && categoryId !== availableIdCategory && (
        <BudgetCategoryButton categoryId={categoryId} name={name} color={color} value={value} />
      )}
    </div>
  );
};
