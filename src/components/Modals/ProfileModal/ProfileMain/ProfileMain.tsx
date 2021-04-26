import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Modal } from '@/components/global/Modal/Modal';
import { TProfileView } from '../types/profileTypes';
import { useActions } from '@/hooks/useActions';
import { auth } from '@/firebase/config';
import { ConfirmModal } from '@/components/Modals/ConfirmModal/ConfrimModal';
import { Button } from '@/components/UIKit/Button/Button';
import styles from './ProfileMain.module.scss';
interface IProps {
  setProfileView: Dispatch<SetStateAction<TProfileView>>;
  onClickSignOut(): void;
}
export const ProfileMain: React.FC<IProps> = ({ setProfileView, onClickSignOut }) => {
  const { DeleteAllBudgets } = useActions();
  const [exitModalStatus, setExitModalStatus] = useState(false);
  const [deleteBudgetsModalStatus, setDeleteBudgetsModalStatus] = useState(false);

  const toggleExitModal = () => setExitModalStatus((prev) => !prev);
  const toggleDeleteBudgetModal = () => setDeleteBudgetsModalStatus((prev) => !prev);
  const changeProfileModalStatus = () => setProfileView('passwordChange');

  const email = !!auth.currentUser ? (auth.currentUser.email as string) : 'null';
  const budgetsLength = useTypedSelector((state) => state.budgets.budgetsLength);
  const [budgetsButtonPromptStatus, setBudgetsButtonPromptStatus] = useState(false);

  const onClickHandlerDeleteBudgets = () => {
    if (budgetsLength) {
      toggleDeleteBudgetModal();
      setBudgetsButtonPromptStatus(false);
    } else {
      setBudgetsButtonPromptStatus(true);
    }
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
            <Button theme="dark" onClick={changeProfileModalStatus} className={styles.button}>
              Change
            </Button>

            <Button theme="dark" onClick={onClickHandlerDeleteBudgets} className={styles.button}>
              Delete all
            </Button>
          </div>
        </div>
        <div className={styles.block_exit}>
          <Button theme="red" onClick={toggleExitModal} className={styles.button_exit}>
            Sign Out
          </Button>
        </div>

        {budgetsButtonPromptStatus && <span className={styles.text_alert}>⚠ You don't have budgets!</span>}
      </div>

      <Modal modalStatus={deleteBudgetsModalStatus} setModalStatus={setDeleteBudgetsModalStatus}>
        <ConfirmModal toggleModal={toggleDeleteBudgetModal} onClickConfirm={DeleteAllBudgets} titleText="Delete budgets?" />
      </Modal>

      <Modal modalStatus={exitModalStatus} setModalStatus={setExitModalStatus}>
        <ConfirmModal toggleModal={toggleExitModal} onClickConfirm={onClickSignOut} titleText="Do you want exit?" />
      </Modal>
    </>
  );
};
