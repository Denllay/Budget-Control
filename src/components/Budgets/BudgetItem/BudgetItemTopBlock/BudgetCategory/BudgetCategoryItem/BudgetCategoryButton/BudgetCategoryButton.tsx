import React, { useContext } from 'react';
import IconChange from '@/assets/svg/iconChange.svg';
import DeleteIcon from '@/assets/svg/daggerIcon.svg';
import styles from './BudgetCategoryButton.module.scss';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { useActions } from '@/hooks/useActions';
interface IProps {
  isChange: boolean;
  name: string;
  categoryId: string;
  value: number;
}
export const BudgetCategoryButton: React.FC<IProps> = ({ categoryId, name, isChange, value }) => {
  const { category, setBudgetStatus, budgetId } = useContext(BudgetBlockContext);
  const { DeleteCategory } = useActions();
  const onClickChangeHandler = () =>
    setBudgetStatus({ isChange: !isChange, categoryChangeId: categoryId, inputValue: name, startValue: name });

  const onClickDeleteHandler = () =>
    DeleteCategory({
      budgetId,
      categoryId,
      freeCategoryValue: (category.find((el) => el.name === 'free')?.value as number) + value,
    });

  return (
    <div className={styles.wrapper}>
      <div className={styles.block_change}>
        <IconChange className={`${styles.icon_change} ${styles.icon}`} onClick={onClickChangeHandler} />
      </div>
      <div className={styles.block_change}>
        <DeleteIcon className={`${styles.icon_change} ${styles.icon}`} onClick={onClickDeleteHandler} />
      </div>
    </div>
  );
};