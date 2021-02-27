import { useActions } from '@/hooks/useActions';
import React from 'react';
import styles from './AutoAdd.module.scss';
interface IProps {
  getNameInput(): string;
  budgetId: string;
  valueFree: number;
  clearCategoryInput(): void;
  color: string;
}
export const AutoAdd: React.FC<IProps> = ({ getNameInput, budgetId, valueFree, clearCategoryInput, color }) => {
  const { AddCategoryBudget } = useActions();
  const onClickAutoAdd = (procent: number) => {
    const nameInput = getNameInput();
    if (nameInput.length >= 3) {
      switch (procent) {
        case 100:
          {
            AddCategoryBudget(budgetId, color, nameInput, valueFree, 0);
            clearCategoryInput();
          }
          break;
        case 50:
          {
            AddCategoryBudget(budgetId, color, nameInput, valueFree / 2, valueFree / 2);
            clearCategoryInput();
          }
          break;
        case 25:
          {
            AddCategoryBudget(budgetId, color, nameInput, valueFree / 4, valueFree - valueFree / 4);
            clearCategoryInput();
          }
          break;
        default:
          return false;
      }
    }
  };
  return (
    <div className={styles.block_button}>
      <button className={styles.auto_add_button} onClick={() => onClickAutoAdd(100)}>
        100%
      </button>
      <button className={styles.auto_add_button} onClick={() => onClickAutoAdd(50)}>
        50%
      </button>
      <button className={styles.auto_add_button} onClick={() => onClickAutoAdd(25)}>
        25%
      </button>
    </div>
  );
};
