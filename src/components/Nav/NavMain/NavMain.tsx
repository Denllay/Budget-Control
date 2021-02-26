import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavMain.module.scss';
import { auth } from '@/Firebase/config';
import { Route, Switch } from 'react-router-dom';
import { useActions } from '@/hooks/useActions';
import { ProfModule } from './ProfModule/ProfModule';
interface IProps {}
export const NavMain: React.FC<IProps> = () => {
  const [profileMenu, setProfileMenu] = useState<boolean>(false);
  const { ShowAddBudget, SignOutAuth } = useActions();
  //
  const email = auth.currentUser && auth.currentUser.email;
  //
  const onClickEmail = () => setProfileMenu((prev) => !prev);
  const closeModalAuth = () => setProfileMenu(false);
  const onClickSignOut = () => SignOutAuth();
  const onChangeShowAdd = () => ShowAddBudget();
  //
  return (
    <div className={styles.wrapper}>
      <ProfModule
        profileMenu={profileMenu}
        onClickSignOut={onClickSignOut}
        email={email}
        closeModalAuth={closeModalAuth}
      />
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <Link to="/main">Main</Link>
        </li>
        <Switch>
          <Route path="/main">
            <li className={styles.list_item} onClick={onChangeShowAdd}>
              <span>Add budget</span>
            </li>
          </Route>
        </Switch>
      </ul>
      <div className={styles.email_block} onClick={onClickEmail}>
        {email}
        <div className={!profileMenu ? styles.arrow : `${styles.arrwo_open} ${styles.arrow}`}>
          <div className={styles.arrow_item1} />
          <div className={styles.arrow_item2} />
        </div>
      </div>
    </div>
  );
};
