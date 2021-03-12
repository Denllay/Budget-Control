import React, { useContext } from 'react';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { ICategoryFormatData } from '@/types/Budget/Budget';
import styles from './BudgetCategoryItem.module.scss';
import { BudgetCategoryButton } from './BudgetCategoryButton/BudgetCategoryButton';
interface IProps {
  data: ICategoryFormatData;
}
export const BudgetCategoryItem: React.FC<IProps> = ({ data }) => {
  const { color, name, value, categoryId } = data;
  const { budgetSum, budgetStatus, setBudgetStatus } = useContext(BudgetBlockContext);
  const { inputValue, isChange, categoryChangeId } = budgetStatus;

  const procentCategory = (value / (budgetSum / 100)).toFixed(1);
  const onChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) =>
    isChange &&
    /^[\wа-я0-9]{0,13}$/i.test(e.target.value) &&
    setBudgetStatus({ ...budgetStatus, inputValue: e.target.value });

  const isChangeCategory = categoryId === categoryChangeId;
  return (
    <div className={styles.wrapper}>
      <div className={styles.block_name}>
        <div className={styles.color} style={{ background: color }}></div>
        <input
          className={styles.input_name}
          disabled={!isChangeCategory}
          value={isChangeCategory ? inputValue : name}
          onChange={onChangeInputName}
          style={{ color }}
        />
      </div>
      <div className={styles.block_procent}>
        <span style={{ color }}>{`${procentCategory}%`}</span>
      </div>

      {!isChange && categoryId !== 'free' && (
        <BudgetCategoryButton isChange={isChange} categoryId={categoryId} name={name} value={value} />
      )}
    </div>
  );
};
