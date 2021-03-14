import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useActions } from '@/hooks/useActions';
import Modal from 'react-modal';
import styles from './AuthModal.module.scss';
import './Modal.scss';
import { TModalAuthStatus } from '@/types/Modal';
interface IProps {
  statusModal: TModalAuthStatus;
}
type IInput = {
  email: string;
  password: string;
  confirmPassword?: string;
};
export const AuthModal: React.FC<IProps> = ({ statusModal }) => {
  const { register, handleSubmit } = useForm<IInput>();
  const { LoginAuth, RegAuth, CloseModal } = useActions();

  const onSubmit: SubmitHandler<IInput> = (data) => {
    const { password, email, confirmPassword } = data;
    const sucsessEmail = /.+@.+\..+/i.test(email);

    if (statusModal === 'login' && sucsessEmail) {
      LoginAuth({ email, password });
      CloseModal();
    } else if (
      statusModal === 'reg' &&
      password.trim() === (confirmPassword as string).trim() &&
      sucsessEmail
    ) {
      RegAuth({ password, email });
      CloseModal();
    } else {
      console.log('Введите данные правильно');
    }
  };
  //

  Modal.setAppElement('#root');
  return (
    <div className={styles.auth_modal}>
      <Modal
        closeTimeoutMS={500}
        isOpen={!!statusModal}
        onRequestClose={CloseModal}
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
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            name="email"
            ref={register({ required: true })}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            name="password"
            ref={register({ required: true, minLength: 6, pattern: /^[A-Za-z0-9@\_\.]+$/i })}
          />
          {statusModal === 'reg' ? (
            <input
              type="password"
              className={styles.input}
              placeholder="Confirm password"
              name="confirmPassword"
              ref={register({ required: true, minLength: 6, pattern: /^[A-Za-z0-9@\_\.]+$/i })}
            />
          ) : null}
          <input type="submit" value="submit" className={styles.submit} />
        </form>
      </Modal>
    </div>
  );
};
