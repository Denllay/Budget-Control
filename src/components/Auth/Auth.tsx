import React, { useState } from 'react';
import styles from './Auth.module.scss';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
type PropsType = RouteComponentProps;
const Auth: React.FC<PropsType> = (props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { RegAuth, LoginAuth } = useActions();
  const path: string = location.pathname;
  const onCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLDivElement).id === 'closeModal' && props.history.push('/');
  };
  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value);
  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);
  const onChangeConfirmPassword = (e: React.FormEvent<HTMLInputElement>) => setConfirmPassword(e.currentTarget.value);
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const sucsessEmail = /.+@.+\..+/i.test(email);
    const sucsessPassword = password.trim() === confirmPassword.trim();
    switch (path) {
      case '/login':
        sucsessEmail ? LoginAuth({ email, password }) : console.log('Введите данные правильно'); //CHANGE
        break;
      case '/registration':
        if (sucsessPassword && sucsessEmail && !!password.trim()) {
          RegAuth({ password, email });
        } else {
          console.log('Напишите данные правильно'); //CHANGE
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.wrapper} id="closeModal" onClick={onCloseModal}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h2>{path === '/login' ? 'Login' : 'Registration'}</h2>
        </div>
        <form className={styles.form} onSubmit={onSubmitForm}>
          <input type="email" className={styles.input} placeholder="Email" value={email} onChange={onChangeEmail} />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
          {path === '/registration' ? (
            <input
              type="password"
              className={styles.input}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={onChangeConfirmPassword}
            />
          ) : null}
          <input type="submit" value="submit" className={styles.submit} />
        </form>
      </div>
    </div>
  );
};
export default withRouter(Auth); // Пришлось использовать из-за history.push()
