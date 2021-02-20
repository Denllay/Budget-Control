import React, { useState } from 'react';
import styles from './BudgetItem.module.scss';
import { PieChart, Pie, Cell } from 'recharts';
import { DataGraph } from './DataGraph/DataGraph';
import { ICategoryData } from '../../../store/types/Budget/Budget';
import { useActions } from '../../../hooks/useActions';
import { EnumCurrency, TCurrency } from '../../../types/Budget';
interface IProps {
  data: ICategoryData[];
  budgetId: string;
}
export const BudgetItem: React.FC<IProps> = ({ data, budgetId }) => {
  const [selectCurrency, setSelectCurrency] = useState<TCurrency>(EnumCurrency.RUB);
  const [budgetInput, setBudgetInput] = useState<string | number>('');
  const [nameInput, setNameInput] = useState<string>('');
  const { AddCategoryBudget, RemoveBudget } = useActions();

  const onChangeSelectCurrency = (e: React.FormEvent<HTMLSelectElement>) =>
    setSelectCurrency(e.currentTarget.value as TCurrency);

  const onChangeInputName = (e: React.FormEvent<HTMLInputElement>) =>
    /^[\wА-я\s]{0,13}$/i.test(e.currentTarget.value) && setNameInput(e.currentTarget.value);

  const onChangeInputBudget = (e: React.FormEvent<HTMLInputElement>) =>
    /^\d{0,13}$/.test(e.currentTarget.value) && setBudgetInput(e.currentTarget.value);

  const budgetSum = data.reduce((acc, el) => acc + el.value, 0);
  const indexFreeCategory = data.findIndex((el) => el.name === 'free');

  const onClickRemove = () => RemoveBudget(budgetId);
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const sucsess =
      nameInput.trim().length >= 3 &&
      (budgetInput as string).length > 0 &&
      budgetInput !== '0' &&
      budgetInput <= data[indexFreeCategory].value;
    if (sucsess) {
      const countFreeCategory = Object.assign({}, data[indexFreeCategory]);
      countFreeCategory.value = countFreeCategory.value - (budgetInput as number);
      AddCategoryBudget(
        budgetId,
        nameInput.trim(),
        Number.parseInt(budgetInput as string),
        selectCurrency,
        countFreeCategory
      );
      setNameInput('');
      setBudgetInput('');
    }
  };
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title_item}>
        Budget{' '}
        <span>
          {budgetSum} {data[0].currency}
        </span>
      </h2>
      <div className={styles.container}>
        <div className={styles.graph_block}>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              stroke="none"
              data={data}
              isAnimationActive={false}
              innerRadius={110}
              outerRadius={140}
              label={false}
              paddingAngle={1}
            >
              {data.map(({ color }, index) => (
                <Cell key={`cell-${index}`} fill={`#${color}`} />
              ))}
            </Pie>
          </PieChart>
          <DataGraph data={data} budgetSum={budgetSum} />
        </div>
        <div className={styles.bottom_container}>
          <form className={styles.form} onSubmit={onSubmitForm}>
            <div className={styles.form_title}>
              <h2>Add new Category</h2>
            </div>
            <input
              type="text"
              placeholder="Name of category"
              className={styles.input}
              value={nameInput}
              onChange={onChangeInputName}
            />
            <div className={styles.block_input_number}>
              <input
                type="text"
                placeholder="Category budget"
                className={styles.input}
                value={budgetInput}
                onChange={onChangeInputBudget}
              />
              <select className={styles.select} value={selectCurrency} onChange={onChangeSelectCurrency}>
                <option className={styles.option}>{EnumCurrency.RUB}</option>
                <option className={styles.option}>{EnumCurrency.USD}</option>
                <option className={styles.option}>{EnumCurrency.EUR}</option>
              </select>
            </div>
            <input type="submit" value="Add" className={styles.submit} />
          </form>

          <div className={styles.icon_block}>
            <div className={styles.icon_item}>
              <div className={styles.icon_remove} onClick={onClickRemove}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
