import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '@/firebase/config';
import { Route } from 'react-router-dom';
import { AddBudgetModal } from '@/components/Modals/AddBudgetModal/AddBudgetModal';
import { Modal } from '@/components/UIKit';
import { ProfileModal } from '@/components/Modals/ProfileModal/ProfileModal';
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
            <Link to="/Budget-Control/main">Main</Link>
          </li>
          <Route path="/Budget-Control/main">
            <li className={styles.list_item} onClick={() => setAddBudgetModalStatus(true)}>
              <span>Add budget</span>
            </li>
          </Route>
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
