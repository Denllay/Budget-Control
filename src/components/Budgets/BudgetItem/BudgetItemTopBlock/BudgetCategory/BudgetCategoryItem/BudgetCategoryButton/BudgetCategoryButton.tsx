import React, { useContext } from 'react';
import IconChange from '@/assets/svg/iconChange.svg';
import DeleteIcon from '@/assets/svg/daggerIcon.svg';
import styles from './BudgetCategoryButton.module.scss';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { useActions } from '@/hooks/useActions';
interface IProps {
  name: string;
  categoryId: string;
  value: number;
  color: string;
}
export const BudgetCategoryButton: React.FC<IProps> = ({ categoryId, name, value, color }) => {
  const { category, budgetId, budgetIndex } = useContext(BudgetBlockContext);
  const availableIdCategory = 'AvailableMoney';
  const { DeleteCategory, SetVolatileInitialData } = useActions();
  const onClickChangeHandler = () =>
    SetVolatileInitialData({
      budgetId,
      volatileCategoryValue: name,
      volatileCategoryId: categoryId,
      volatileCategoryColor: color,
      volatileCategoryMoney: value,
    });
  const onClickDeleteHandler = () =>
    DeleteCategory({
      budgetId,
      categoryDeleteId: categoryId,
      availableMoneyCategory:
        (category.find((el) => el.categoryId === availableIdCategory)?.value as number) + value,
      budgetIndex,
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
