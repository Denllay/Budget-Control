import React, { useContext, useEffect } from 'react';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { ICategoryFormatData } from '@/types/Budget/Budget';
import styles from './BudgetCategoryItem.module.scss';
import { BudgetCategoryButton } from './BudgetCategoryButton/BudgetCategoryButton';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
interface IProps {
  data: ICategoryFormatData;
}
export const BudgetCategoryItem: React.FC<IProps> = ({ data }) => {
  const { color, name, value, categoryId } = data;
  const { budgetSum, budgetId } = useContext(BudgetBlockContext);
  const { ChangeVolatileInput } = useActions();
  const { budgetIsChange, volatileCategoryId, volatileInputValue } = useTypedSelector(
    (state) => state?.volatileBudgets[budgetId] || {}
  );
  const procentCategory = (value / (budgetSum / 100)).toFixed(1);
  const onChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    budgetIsChange &&
      /^[\wа-я0-9]{0,13}$/i.test(e.target.value) &&
      ChangeVolatileInput({ volatileInputValue: e.target.value, budgetId });
  };
  const isChangeCategory = categoryId === volatileCategoryId;
  return (
    <div className={styles.wrapper}>
      <div className={styles.block_name}>
        <div className={styles.color} style={{ background: color }}></div>
        <input
          className={styles.input_name}
          disabled={!budgetIsChange}
          value={isChangeCategory ? (volatileInputValue as string) : name}
          onChange={onChangeInputName}
          style={{ color }}
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
