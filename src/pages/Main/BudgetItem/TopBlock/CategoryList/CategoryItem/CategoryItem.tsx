import React, { useContext } from 'react';
import { ICategoryFormatData } from '@/types/Budget/Budget';
import { CategoryButton } from './CategoryButton/CategoryButton';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import styles from './CategoryItem.module.scss';
interface IProps {
  dataCategory: ICategoryFormatData;
}
const availableIdCategory = 'AvailableMoney';

export const CategoryItem: React.FC<IProps> = ({ dataCategory }) => {
  const { budgetIndex } = useContext(BudgetBlockContext);
  const { budgetSum, budgetId } = useTypedSelector((state) => state.budgets.budgetsData[budgetIndex]);
  const budgetIsChange = useTypedSelector((state) => state?.volatile[budgetId]?.budgetIsChange || false);
  const { categoryColor, categoryName, categoryMoney, categoryId } = dataCategory;

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

      {!budgetIsChange && categoryId !== availableIdCategory ? <CategoryButton dataCategory={dataCategory} /> : null}
    </div>
  );
};
