import React, { useContext } from 'react';
import styles from './ChangeBlock.module.scss';
import { BudgetDataContext } from '../../../../../context/BudgetDataContext';
import { useActions } from '../../../../../hooks/useActions';
interface IProps {
  categoryId: string;
  categoryValue: number;
}
export const ChangeBlock: React.FC<IProps> = ({ categoryId, categoryValue }) => {
  const { budgetId, data } = useContext(BudgetDataContext);
  const { DeleteCategoryBudget } = useActions();
  const onClickRemoveCategory = () => {
    const indexFreeCategory = data.findIndex((el) => el.name === 'free');
    const freeCategoryValue = data[indexFreeCategory]['value'] + categoryValue;

    DeleteCategoryBudget(budgetId, categoryId, freeCategoryValue);
  };
  return (
    <ul className={styles.list}>
      <li className={styles.list_item} onClick={onClickRemoveCategory}>
        <div className={styles.icon_remove}></div>
      </li>
    </ul>
  );
};
