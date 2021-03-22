import React, { useContext, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import styles from './BudgetChangeCategory.module.scss';
import { BudgetBlockContext } from '@/context/BudgetBlockContext';
import { CategoryColorPick } from '../CategoryColorPick/CategoryColorPick';
interface IProps {
  budgetId: string;
}

export const BudgetChangeCategory: React.FC<IProps> = ({ budgetId }) => {
  const { ClearVolatileData, ChangeDataCategory } = useActions();
  const { budgetIndex } = useContext(BudgetBlockContext);
  const {
    volatileCategoryValue,
    volatileCategoryMoney,
    volatileCategoryId,
    volatileCategoryColor,
  } = useTypedSelector((state) => state.volatileBudgets[budgetId]);
  const categoryAvailableMoneyId = 'AvailableMoney';
  const categoryAvailableMoney =
    useTypedSelector((state) => state.budgets.budgetsData[budgetIndex].category).find(
      (el) => el.categoryId === categoryAvailableMoneyId
    )?.value || 0;

  const [categoryName, setCategoryName] = useState(volatileCategoryValue);
  const onChangeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) =>
    /^[\wа-я0-9]{0,13}$/i.test(e.target.value) && setCategoryName(e.target.value);

  const [categoryMoney, setCategoryMoney] = useState<string | number>(volatileCategoryMoney);
  const onChangeCategoryMoney = (e: React.ChangeEvent<HTMLInputElement>) => setCategoryMoney(e.target.value);

  const [categoryColor, setCategoryColor] = useState(volatileCategoryColor);

  const clearVolatileData = () => ClearVolatileData(budgetId);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sucsess = categoryName.length >= 3 && categoryMoney <= categoryAvailableMoney && categoryMoney;
    if (sucsess) {
      ChangeDataCategory({
        budgetIndex,
        budgetId,
        newcategoryAvailableMoney:
          categoryAvailableMoney + (volatileCategoryMoney - Number.parseInt(categoryMoney as string)),
        newCategoryData: {
          newCategoryMoney: Number.parseInt(categoryMoney as string),
          newCategoryName: categoryName,
          newCategoryColor: categoryColor,
          volatileCategoryId,
        },
      });
      clearVolatileData();
    }
  };
  return (
    <div className={styles.bottom_container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form_title}>
          <h2>Add new Category</h2>
        </div>
        <div className={styles.block_input_name}>
          <input
            type="text"
            placeholder="Category name"
            value={categoryName}
            onChange={onChangeCategoryName}
            className={styles.input}
          />
          <CategoryColorPick color={categoryColor} setColor={setCategoryColor} />
        </div>
        <div className={styles.block_input_number}>
          <input
            type="number"
            placeholder="Category money"
            value={categoryMoney}
            onChange={onChangeCategoryMoney}
            className={`${styles.input} ${styles.input_number}`}
          />
        </div>
        <div className={styles.button_block}>
          <button type="submit" className={styles.button_item}>
            Submit
          </button>
          <button className={`${styles.button_item} ${styles.button_cancel}`} onClick={clearVolatileData}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
