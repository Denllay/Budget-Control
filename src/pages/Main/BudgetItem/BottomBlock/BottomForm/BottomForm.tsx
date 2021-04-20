import React, { Dispatch, memo, SetStateAction, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { Modal } from '@/components/global/Modal/Modal';
import { CategoryColorPick } from '../CategoryColorPick/CategoryColorPick';
import { ConfirmModal } from '@/components/Modals/ConfirmModal/ConfrimModal';
import styles from './BottomForm.module.scss';
import { UseFormMethods } from 'react-hook-form';
// Надо бы как то отрефакторить данный компонент, а то просто пздц)
//! Change
interface IProps extends Pick<UseFormMethods, 'register' | 'errors' | 'setValue'> {
  budgetId: string;
  budgetFormStatus: 'CHANGE' | 'ADD';
  categoryColor: string;
  setCategoryColor: Dispatch<SetStateAction<string>>;
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  checkCategoryMaxMoney(): string | boolean;
}

export const BottomForm: React.FC<IProps> = memo(
  ({
    budgetId,
    children,
    budgetFormStatus,
    onSubmit,
    categoryColor,
    setCategoryColor,
    register: categoryRef,
    errors,
    setValue,
    checkCategoryMaxMoney,
  }) => {
    const [deleteBudetModalStatus, setDeleteBudetModalStatus] = useState(false);
    const toggleDeleteBudgetModal = () => setDeleteBudetModalStatus((prev) => !prev);

    const { DeleteBudget } = useActions();
    const deleteBudget = () => DeleteBudget(budgetId);

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
      setValue('currencyCategory', e.target.value);

    return (
      <>
        <div className={styles.bottom_container}>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.form_title}>
              <h2>Add new Category</h2>
            </div>

            <div className={styles.block_input_name}>
              <div>
                <input
                  type="text"
                  placeholder="Category name"
                  name="categoryName"
                  autoComplete="off"
                  className={styles.input}
                  ref={categoryRef({
                    required: true,
                    minLength: {
                      value: 3,
                      message: '⚠ you must enter at least 3 characters',
                    },
                    maxLength: {
                      value: 9,
                      message: '⚠ category name must be no more than 9 characters',
                    },
                    pattern: /^[\w\S]+$/i,
                  })}
                />
                {errors!.categoryName && <p className={styles.text_alert}>{errors!.categoryName.message}</p>}
              </div>
              <CategoryColorPick color={categoryColor} setColor={setCategoryColor} />
            </div>

            <div className={styles.block_input_number}>
              <div>
                <input
                  type="number"
                  placeholder="Category money"
                  name="categoryMoney"
                  autoComplete="off"
                  className={`${styles.input} ${styles.input_number}`}
                  ref={categoryRef({
                    required: {
                      value: true,
                      message: '⚠ you must enter a budget',
                    },
                    maxLength: {
                      value: 13,
                      message: '⚠ this value exceeds the maximum value',
                    },
                    valueAsNumber: true,
                    validate: checkCategoryMaxMoney,
                  })}
                />
                {errors!.categoryMoney && (
                  <p className={styles.text_alert}>{errors!.categoryMoney.message}</p>
                )}
              </div>
              {budgetFormStatus === 'ADD' && (
                <select
                  className={styles.select}
                  name="currencyCategory"
                  onChange={selectChange}
                  ref={categoryRef}
                >
                  <option className={styles.option}>RUB</option>
                  <option className={styles.option}>USD</option>
                </select>
              )}
            </div>
            {children}
          </form>

          <div className={styles.icon_block}>
            <div className={styles.icon_item} onClick={toggleDeleteBudgetModal}>
              <div className={styles.icon_remove}></div>
            </div>
          </div>
        </div>

        <Modal setModalStatus={setDeleteBudetModalStatus} modalStatus={deleteBudetModalStatus}>
          <ConfirmModal
            toggleModal={toggleDeleteBudgetModal}
            onClickConfirm={deleteBudget}
            titleText="Delete budget?"
          />
        </Modal>
      </>
    );
  }
);
