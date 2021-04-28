import React, { useContext } from 'react';
import IconChange from '@/assets/svg/iconChange.svg';
import DeleteIcon from '@/assets/svg/daggerIcon.svg';
import styles from './CategoryButton.module.scss';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { useActions } from '@/hooks/useActions';
import { ICategoryFormatData } from '@/types/Budget/Budget';
import { useTypedSelector } from '@/hooks/useTypedSelector';
interface IProps {
  dataCategory: ICategoryFormatData;
}

const indexCategoryAvaibleMoney = 0;

export const CategoryButton: React.FC<IProps> = ({ dataCategory }) => {
  const { budgetIndex } = useContext(BudgetBlockContext);
  const { budgetId, category } = useTypedSelector((state) => state.budgets.budgetsData[budgetIndex]);
  const { DeleteCategory, SetVolatileInitialData } = useActions();

  const { categoryColor, categoryName, categoryCurrency, categoryId, categoryMoney } = dataCategory;

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
      availableMoneyCategory: category[indexCategoryAvaibleMoney].categoryMoney! + categoryMoney,
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
