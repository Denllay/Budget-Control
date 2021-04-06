import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { CreateConfirmDialogModal } from '@/utilities/CreateConfirmDialogModal/CreateConfirmDialogModal';
import { TProfileView } from '../types/profileTypes';
import styles from './ProfileMain.module.scss';
import { useActions } from '@/hooks/useActions';
import { auth } from '@/firebase/config';
interface IProps {
  setProfileView: Dispatch<SetStateAction<TProfileView>>;
  onClickSignOut(): void;
}
export const ProfileMain: React.FC<IProps> = ({ setProfileView, onClickSignOut }) => {
  const email = !!auth.currentUser ? (auth.currentUser.email as string) : 'null';
  const budgetsLength = useTypedSelector((state) => state.budgets.budgetsLength);
  const [budgetsButtonPromptStatus, setBudgetsButtonPromptStatus] = useState(false);

  const { DeleteAllBudgets } = useActions();

  const {
    toggleModal: toggleSignOutDialog,
    ConfirmDialogModal: ConfirmDialogSignOut,
  } = CreateConfirmDialogModal({
    titleText: 'Сonfirm exit',
    onConfirmClick: onClickSignOut,
  });

  const {
    toggleModal: toggleDeleteAllBudgetDialog,
    ConfirmDialogModal: ConfirmDialogDeleteAllBudget,
  } = CreateConfirmDialogModal({
    titleText: 'Delete budgets',
    onConfirmClick: DeleteAllBudgets,
  });

  const onClickHandlerDeleteBudgets = () => {
    if (budgetsLength) {
      toggleDeleteAllBudgetDialog();
      setBudgetsButtonPromptStatus(false);
    } else setBudgetsButtonPromptStatus(true);
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.block_title}>
          Email: <span>{email}</span>
        </div>
        <div className={styles.block_statistics}>
          <ul className={styles.list}>
            <li className={styles.list_item}>
              <div>
                Password: <span> ***</span>
              </div>
            </li>
            <li className={styles.list_item}>
              <div>
                Budgets: <span>{budgetsLength}</span>
              </div>
            </li>
          </ul>
          <div className={styles.block_button}>
            <button className={styles.block_button_item} onClick={() => setProfileView('passwordChange')}>
              Change
            </button>
            <button className={styles.block_button_item} onClick={onClickHandlerDeleteBudgets}>
              Delete all
            </button>
          </div>
        </div>
        <div className={styles.block_exit}>
          <button className={styles.block_exit_button} onClick={toggleSignOutDialog}>
            Sign Out
          </button>
        </div>
        {budgetsButtonPromptStatus && <span className={styles.text_alert}>⚠ You don't have budgets!</span>}
      </div>
      {ConfirmDialogSignOut}
      {ConfirmDialogDeleteAllBudget}
    </>
  );
};
