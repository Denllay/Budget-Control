import React, { useContext } from 'react';
import { ProfileContext } from '@/context/ProfileContext';
import { auth } from '@/firebase/config';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import styles from './ProfModuleSettingsView.module.scss';
import { useActions } from '@/hooks/useActions';
import useConfirmationDialog from '@/hooks/useConfirmDialog';

export const ProfModuleSettingsView: React.FC = () => {
  const { setProfileView } = useContext(ProfileContext);
  const budgetLength = useTypedSelector((state) => state?.budgets?.budgetsData).length;
  const { DeleteAllBudgets } = useActions();

  const { Dialog, onOpen } = useConfirmationDialog({
    headerText: 'Do you confirm delete all budgets?',
    onConfirmClick: onClickRemoveBudgets,
  });
  function onClickRemoveBudgets() {
    setProfileView('view');
    DeleteAllBudgets();
  }

  const email = !!auth.currentUser ? (auth.currentUser.email as string) : 'null';
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
              Budgets: <span>{budgetLength}</span>
            </li>
          </ul>
          <div className={styles.list_container_button_block}>
            <button className={styles.button_block_item} onClick={() => setProfileView('updatePassword')}>
              Change
            </button>
            <button className={styles.button_block_item}>Change theme</button>
            <button className={styles.button_block_item} onClick={() => onOpen()}>
              Delete all
            </button>
          </div>
        </div>
      </div>
      <Dialog />
    </div>
  );
};
