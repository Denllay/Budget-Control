import React from 'react';
import styles from './PreLoaderBudget.module.scss';
interface IProps {}
export const PreLoaderBudget: React.FC<IProps> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.graph_block}>
          <div className={styles.chart} />
          <ul className={styles.category_list}>
            <li className={styles.list_item}></li>
            <li className={styles.list_item}></li>
            <li className={styles.list_item}></li>
            <li className={styles.list_item}></li>
          </ul>
        </div>
        <div className={styles.bottom_block}>
          <div className={styles.form_block}>
            <div className={styles.form_block__title} />
            <div className={styles.form_block__subtitle} />
          </div>
          <div className={styles.icon_block}>
            <div className={styles.icon_block__item} />
            <div className={styles.icon_block__item} />
          </div>
        </div>
      </div>
    </div>
  );
};
