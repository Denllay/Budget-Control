import React, { memo, useEffect } from 'react';
import { ICategoryFormatData } from '@/types/Budget/Budget';
import styles from './BudgetCategoryItem.module.scss';
import { BudgetCategoryButton } from './BudgetCategoryButton/BudgetCategoryButton';
import { useActions } from '@/hooks/useActions';
interface IProps {
  budgetSum: number;
  budgetId: string;
  categoryData: ICategoryFormatData;
  budgetIsChange: boolean;
  volatileCategoryId: null | string;
  volatileInputValue: null | string;
}
export const BudgetCategoryItem: React.FC<IProps> = ({
  categoryData,
  budgetId,
  budgetSum,
  volatileCategoryId,
  budgetIsChange,
  volatileInputValue,
}) => {
  const { color, name, value, categoryId } = categoryData;
  const { ChangeVolatileInput } = useActions();
  const isChangeCategory = categoryId === volatileCategoryId;

  const procentCategory = (value / (budgetSum / 100)).toFixed(1);
  const onChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    budgetIsChange &&
      /^[\wа-я0-9]{0,13}$/i.test(e.target.value) &&
      ChangeVolatileInput({ volatileInputValue: e.target.value, budgetId });
  };
  useEffect(() => {
    console.log('RENDER CATEGORYITEM');
  });
  return (
    <div className={styles.wrapper}>
      <div className={styles.block_name}>
        <div className={styles.color} style={{ background: color }}></div>
        <input
          className={styles.input_name}
          disabled={!isChangeCategory}
          value={isChangeCategory ? (volatileInputValue as string) : name}
          style={{ color }}
          onChange={onChangeInputName}
        />
      </div>
      <div className={styles.block_procent}>
        <span style={{ color }}>{`${procentCategory}%`}</span>
      </div>

      {!budgetIsChange && categoryId !== 'free' && (
        <BudgetCategoryButton categoryId={categoryId} name={name} value={value} />
      )}
    </div>
  );
};
