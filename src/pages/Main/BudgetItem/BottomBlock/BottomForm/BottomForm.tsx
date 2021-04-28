import React, { memo, useState } from 'react';
import { useActions } from '@/hooks/useActions';
import { CategoryColorPick } from '../CategoryColorPick/CategoryColorPick';
import { ConfirmModal } from '@/components/Modals/ConfirmModal/ConfrimModal';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { useCountMoneyConsideringCurrency } from '@/hooks/useCountMoneyConsideringCurrency';
import { TCurrency } from '@/types/Budget/Budget';
import { IFormValuesBottomForm, OnSubmitBottomFormFunction } from '@/types/Budget/BottomForm';
import { FormInput, FormSelect, Modal, Title } from '@/components/UIKit';
import styles from './BottomForm.module.scss';
import * as Yup from 'yup';

interface IProps {
  budgetId: string;
  budgetFormStatus: 'CHANGE' | 'ADD';
  initialValues: IFormValuesBottomForm;
  initialDataColor: string;
  budgetCurrency: TCurrency;
  availableMoneyCategory: number;
  onSuccessfulFunction: OnSubmitBottomFormFunction;
}

const categorySchema: Yup.SchemaOf<IFormValuesBottomForm> = Yup.object().shape({
  categoryName: Yup.string()
    .required('⚠ Enter name category')
    .min(3, '⚠ You must enter at least 3 characters')
    .max(9, '⚠ Category name must be no more than 9 characters')
    .matches(/^[\w\S]+$/i, '⚠ Invalid characters entered'),

  categoryMoney: Yup.string().required('⚠ Enter money category').max(13, '⚠ This value exceeds the maximum value'),

  categoryCurrency: Yup.string().required(),
});

const options = [
  { value: 'RUB', name: 'RUB' },
  { value: 'USD', name: 'USD' },
];
const titleStyle = { fontSize: '36px' };
export const BottomForm: React.FC<IProps> = memo(
  ({
    budgetId,
    children,
    budgetFormStatus,
    initialValues,
    initialDataColor,
    budgetCurrency,
    availableMoneyCategory,
    onSuccessfulFunction,
  }) => {
    const { DeleteBudget } = useActions();
    const deleteBudget = () => DeleteBudget(budgetId);

    const countMoneyConsideringCurrency = useCountMoneyConsideringCurrency();
    const [categoryColor, setCategoryColor] = useState(initialDataColor);
    const [deleteBudetModalStatus, setDeleteBudetModalStatus] = useState(false);
    const toggleDeleteBudgetModal = () => setDeleteBudetModalStatus((prev) => !prev);

    const validate = ({ categoryMoney, categoryCurrency }: IFormValuesBottomForm) => {
      let error = {} as IFormValuesBottomForm;

      const moneyConsideringCurrency = countMoneyConsideringCurrency({
        categoryMoney: +categoryMoney,
        categoryCurrency: categoryCurrency as TCurrency,
        budgetCurrency,
      });

      if (moneyConsideringCurrency > availableMoneyCategory + +initialValues.categoryMoney) {
        error.categoryMoney = '⚠  Category budget exceeds available funds';
      }
      return error;
    };

    const onSubmit = async (
      { categoryMoney, categoryCurrency, categoryName }: IFormValuesBottomForm,
      { resetForm }: FormikHelpers<IFormValuesBottomForm>
    ) => {
      const moneyConsideringCurrency = countMoneyConsideringCurrency({
        categoryMoney: +categoryMoney,
        categoryCurrency: categoryCurrency as TCurrency,
        budgetCurrency,
      });

      onSuccessfulFunction({ categoryName, categoryMoney: moneyConsideringCurrency, categoryColor });
      setCategoryColor('#c4c4c4');
      resetForm();
    };

    return (
      <>
        <div className={styles.bottom_container}>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate} validationSchema={categorySchema}>
            <Form className={styles.form}>
              <Title style={titleStyle}>Add new Category</Title>

              <div className={styles.block_input}>
                <Field name="categoryName" placeholder="Category name" className={styles.input} component={FormInput} />

                <CategoryColorPick color={categoryColor} setColor={setCategoryColor} />
              </div>

              <div className={styles.block_input}>
                <Field
                  name="categoryMoney"
                  placeholder="Category money"
                  type="number"
                  className={styles.input}
                  component={FormInput}
                />

                {budgetFormStatus === 'ADD' && (
                  <FormSelect name="categoryCurrency" className={styles.select} options={options} />
                )}
              </div>
              {children}
            </Form>
          </Formik>

          <div className={styles.icon_block}>
            <div className={styles.icon_item} onClick={toggleDeleteBudgetModal}>
              <div className={styles.icon_remove}></div>
            </div>
          </div>
        </div>

        <Modal setModalStatus={setDeleteBudetModalStatus} modalStatus={deleteBudetModalStatus}>
          <ConfirmModal toggleModal={toggleDeleteBudgetModal} onClickConfirm={deleteBudget} titleText="Delete budget?" />
        </Modal>
      </>
    );
  }
);
