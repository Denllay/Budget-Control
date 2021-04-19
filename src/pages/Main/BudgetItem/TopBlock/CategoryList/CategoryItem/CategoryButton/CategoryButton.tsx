import React, { useContext } from 'react';
import IconChange from '@/assets/svg/iconChange.svg';
import DeleteIcon from '@/assets/svg/daggerIcon.svg';
import styles from './CategoryButton.module.scss';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { useActions } from '@/hooks/useActions';
import { TCurrency } from '@/types/Budget/Budget';
interface IProps {
  categoryName: string;
  categoryId: string;
  categoryMoney: number;
  categoryColor: string;
  categoryCurrency: TCurrency;
}

export const CategoryButton: React.FC<IProps> = ({
  categoryId,
  categoryName,
  categoryMoney,
  categoryColor,
  categoryCurrency,
}) => {
  const { category, budgetId, budgetIndex } = useContext(BudgetBlockContext);
  const availableIdCategory = 'AvailableMoney';
  const { DeleteCategory, SetVolatileInitialData } = useActions();

  const onClickChangeHandler = () =>
    SetVolatileInitialData({
      budgetId,
      volatileCategoryName: categoryName,
      volatileCategoryId: categoryId,
      volatileCategoryColor: categoryColor,
      volatileCategoryMoney: categoryMoney,
      volatileCategoryCurrency: categoryCurrency,
    });

  const onClickDeleteHandler = () =>
    DeleteCategory({
      budgetId,
      categoryDeleteId: categoryId,
      availableMoneyCategory:
        category.find((el) => el.categoryId === availableIdCategory)?.categoryMoney! + categoryMoney,
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
