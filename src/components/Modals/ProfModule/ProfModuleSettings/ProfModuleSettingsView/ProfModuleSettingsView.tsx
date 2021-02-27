import React, { useContext, useEffect } from 'react';
import { ProfileContext } from '@/context/ProfileContext';
import styles from './ProfModuleSettingsView.module.scss';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
interface IProps {}
export const ProfModuleSettingsView: React.FC<IProps> = () => {
  const { setProfileView, email } = useContext(ProfileContext);
  const { RemoveAllBudgets, GetBudgetsLength } = useActions();
  const budgetsLength = useTypedSelector((state) => state?.budget?.budgetsLength);
  const onClickRemoveBudgets = () => {
    setProfileView('view');
    RemoveAllBudgets();
  };
  useEffect(() => {
    GetBudgetsLength();
    console.log(budgetsLength);
  }, [budgetsLength]);
  return (
    <div className={styles.wrapper}>
      <button className={styles.button_back} onClick={() => setProfileView('view')}>
        Back
      </button>
      <div className={styles.container}>
        <div className={styles.email_block}>
          Email: <span> {email}</span>
        </div>
        <div className={styles.list_container}>
          <ul className={styles.list_container_data_block}>
            <li className={styles.data_block_item}>
              Password: <span> ***</span>
            </li>
            <li className={styles.data_block_item}>
              Theme: <span> black</span>
            </li>
            <li className={styles.data_block_item}>
              Budgets: <span> {budgetsLength}</span>
            </li>
          </ul>
          <div className={styles.list_container_button_block}>
            <button className={styles.button_block_item} onClick={() => setProfileView('updatePassword')}>
              Change
            </button>
            <button className={styles.button_block_item}>Change theme</button>
            <button className={styles.button_block_item} onClick={onClickRemoveBudgets}>
              Delete all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
