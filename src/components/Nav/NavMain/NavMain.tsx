import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavMain.module.scss';
import { auth } from '@/firebase/config';
import { Route, Switch } from 'react-router-dom';
import { AddBudgetModal } from '@/components/global/Modals/AddBudgetModal/AddBudgetModal';
import { ProfileModal } from '@/components/global/Modals/ProfileModal/ProfileModal';
import { CreateModal } from '@/utilities/CreateModal/CreateModal';
export const NavMain: React.FC = () => {
  const { toggleModal: toggleModalAddBudget, ModalComponent: AddBudgetModalComponent } = CreateModal({
    component: AddBudgetModal,
  });
  const { toggleModal: toggleModalProfile, ModalComponent: ProfileModalComponent } = CreateModal({
    component: ProfileModal,
  });
  const email = !!auth.currentUser && auth.currentUser.email;
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <Link to="/main">Main</Link>
        </li>
        <Switch>
          <Route path="/main">
            <li className={styles.list_item} onClick={toggleModalAddBudget}>
              <span>Add budget</span>
            </li>
          </Route>
        </Switch>
      </ul>
      <div className={styles.email_block} onClick={toggleModalProfile}>
        {email}
      </div>
      {AddBudgetModalComponent}
      {ProfileModalComponent}
    </div>
  );
};
