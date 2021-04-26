import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { TProfileView } from '../../../../types/ProfileTypes';
import { useActions } from '@/hooks/useActions';
import { auth } from '@/firebase/config';
import { ConfirmModal } from '@/components/Modals/ConfirmModal/ConfrimModal';
import { Modal, Button } from '@/components/UIKit';
import { ProfileStatistic } from './ProfileStatistic/ProfileStatistic';
import { Title } from '@/components/UIKit';
import styles from './ProfileMain.module.scss';
interface IProps {
  setProfileView: Dispatch<SetStateAction<TProfileView>>;
  onClickSignOut(): void;
}
const titleStyle = {
  color: '#282d3c',
  fontSize: '36px',
};
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
        <Title style={titleStyle}>
          Email: <span>{email}</span>
        </Title>

        <div className={styles.block_statistics}>
          <ProfileStatistic budgetsLength={budgetsLength} />

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
