import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './Auth.module.scss';
import { useActions } from '../../hooks/useActions';
import { TModalAuth } from '../../types/ModalAuth';
import Modal from 'react-modal';
import './Modal.scss';
interface IProps {
  statusModal: TModalAuth;
  setModal: Dispatch<SetStateAction<TModalAuth>>;
}
export const Auth: React.FC<IProps> = ({ statusModal, setModal }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { RegAuth, LoginAuth } = useActions();
  //
  const closeModal = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setModal(null);
  };
  function afterOpenModal(e) {
    // e.overlayEl.style.background = '#fff';
  }
  //
  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value);
  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);
  const onChangeConfirmPassword = (e: React.FormEvent<HTMLInputElement>) => setConfirmPassword(e.currentTarget.value);
  //
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const sucsessEmail = /.+@.+\..+/i.test(email);
    const sucsessPassword = password.trim() === confirmPassword.trim() && password.trim();

    if (statusModal === 'login' && sucsessEmail && password.trim()) {
      LoginAuth({ email, password });
      closeModal();
    } else if (statusModal === 'reg' && sucsessPassword && sucsessEmail) {
      RegAuth({ password, email });
      closeModal();
    } else {
      console.log('Введите данные правильно');
    }
  };
  Modal.setAppElement('#root');
  return (
    <div className={styles.auth_modal}>
      <Modal
        closeTimeoutMS={500}
        isOpen={!!statusModal}
        onRequestClose={closeModal}
        onAfterOpen={afterOpenModal}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            zIndex: 100,
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#535763',
            border: 'none',
            width: '50vw',
            padding: '50px 35px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <div className={styles.title}>
          <h2>{statusModal === 'login' ? 'Login' : statusModal === 'reg' ? 'Registration' : 'Bye!!!!'}</h2>
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
          {statusModal === 'reg' ? (
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
      </Modal>
    </div>
  );
};
