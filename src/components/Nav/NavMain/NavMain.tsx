import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '@/firebase/config';
import { Route, Switch } from 'react-router-dom';
import { AddBudgetModal } from '@/components/global/Modals/AddBudgetModal/AddBudgetModal';
import { Modal } from '@/utilities/Modal/Modal';
import { ProfileModal } from '@/components/global/Modals/ProfileModal/ProfileModal';
import styles from './NavMain.module.scss';

export const NavMain: React.FC = () => {
  const [addBudgetModalStatus, setAddBudgetModalStatus] = useState(false);

  const [profileModalStatus, setProfileModalStatus] = useState(false);

  const email = !!auth.currentUser && auth.currentUser.email;
  return (
    <>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <Link to="/main">Main</Link>
          </li>
          <Switch>
            <Route path="/main">
              <li className={styles.list_item} onClick={() => setAddBudgetModalStatus(true)}>
                <span>Add budget</span>
              </li>
            </Route>
          </Switch>
        </ul>
        <div className={styles.email_block} onClick={() => setProfileModalStatus(true)}>
          {email}
        </div>
      </div>

      <Modal modalStatus={addBudgetModalStatus} setModalStatus={setAddBudgetModalStatus}>
        <AddBudgetModal setModalStatus={setAddBudgetModalStatus} />
      </Modal>

      <Modal modalStatus={profileModalStatus} setModalStatus={setProfileModalStatus}>
        <ProfileModal />
      </Modal>
    </>
  );
};
