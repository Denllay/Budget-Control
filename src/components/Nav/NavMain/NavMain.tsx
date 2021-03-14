import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavMain.module.scss';
import { auth } from '@/firebase/config';
import { Route, Switch } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { EnumModalAction } from '@/types/Modal';
export const NavMain: React.FC = () => {
  const { ChangeViewModal } = useActions();
  const onClickModalHandler = (
    typeModal: EnumModalAction.SHOW_PROF_MODAL | EnumModalAction.SHOW_ADD_BUDGET_MODAL
  ) => ChangeViewModal({ type: typeModal });

  const email = !!auth.currentUser && auth.currentUser.email;
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <Link to="/main">Main</Link>
        </li>
        <Switch>
          <Route path="/main">
            <li
              className={styles.list_item}
              onClick={() => onClickModalHandler(EnumModalAction.SHOW_ADD_BUDGET_MODAL)}
            >
              <span>Add budget</span>
            </li>
          </Route>
        </Switch>
      </ul>
      <div
        className={styles.email_block}
        onClick={() => onClickModalHandler(EnumModalAction.SHOW_PROF_MODAL)}
      >
        {email}
      </div>
    </div>
  );
};
