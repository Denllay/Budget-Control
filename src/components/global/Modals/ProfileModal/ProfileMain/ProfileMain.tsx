import React, { Dispatch, SetStateAction } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { CreateConfirmDialogModal } from '@/utilities/ConfirmDialogModal/CreateConfirmDialogModal';
import { TProfileView } from '../types/profileTypes';
import styles from './ProfileMain.module.scss';
import { useActions } from '@/hooks/useActions';
interface IProps {
  email: string;
  setProfileView: Dispatch<SetStateAction<TProfileView>>;
  onClickSignOut(): void;
}
export const ProfileMain: React.FC<IProps> = ({ email, setProfileView, onClickSignOut }) => {
  const budgetsLength = useTypedSelector((state) => state.budgets.budgetsData).length;
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
    budgetsLength ? toggleDeleteAllBudgetDialog : console.log(`you haven't budgets`); //! Change
  };
  return (
    <div className={styles.content}>
      <div className={styles.block_title}>
        Email: <span>{email}</span>
      </div>
      <div className={styles.block_statistics}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            Password: <span> ***</span>
          </li>
          <li className={styles.list_item}>
            Budgets: <span>{budgetsLength}</span>
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
      {ConfirmDialogSignOut}
      {ConfirmDialogDeleteAllBudget}
    </div>
  );
};
