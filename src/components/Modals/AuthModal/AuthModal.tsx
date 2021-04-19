import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useActions } from '@/hooks/useActions';
import { EnumAlertModalData, TAuthModalMode } from '@/types/Modal';
import { IInput } from './type';
import { AlertModal } from '../AlertModal/AlertModal';
import styles from './AuthModal.module.scss';
import { Modal } from '@/components/global/Modal/Modal';
interface IProps {
  authModalMode: TAuthModalMode;
}

export const AuthModal: React.FC<IProps> = ({ authModalMode }) => {
  const { register: auth, handleSubmit, watch, errors } = useForm<IInput>();
  const [alertModalStatus, setAlertModalStatus] = useState(false);

  const { LoginAuth, RegAuth } = useActions();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit: SubmitHandler<IInput> = ({ password, email }) => {
    if (authModalMode === 'LOGIN') {
      LoginAuth({ password, email, setAlertModalStatus });
    } else {
      RegAuth({ password, email, setAlertModalStatus });
    }
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.block_title}>{authModalMode === 'LOGIN' ? 'Login' : 'Registration'}</div>
        <form className={styles.block_form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className={styles.block_form_input}
            placeholder="Email"
            name="email"
            autoComplete="off"
            ref={auth({
              required: true,
              pattern: {
                value: /^\S+@\S+$/i,
                message: '⚠ Enter a valid email',
              },
            })}
          />

          {errors.email && <p className={styles.text_alert}>{errors.email.message}</p>}

          <input
            type="password"
            className={styles.block_form_input}
            placeholder="Password"
            name="password"
            autoComplete="off"
            ref={auth({
              required: true,
              minLength: {
                value: 6,
                message: '⚠ Password must have at least 6 characters',
              },
              pattern: /^[A-Za-z0-9@\_\.]+$/i,
            })}
          />
          {errors.password && <p className={styles.text_alert}>{errors.password.message}</p>}

          {authModalMode === 'REGISTRATION' && (
            <>
              <input
                type="password"
                className={styles.block_form_input}
                placeholder="Confirm password"
                name="confirmPassword"
                autoComplete="off"
                ref={auth({
                  validate: (value) => value === password.current || '⚠ The passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className={styles.text_alert}>{errors.confirmPassword.message}</p>
              )}
            </>
          )}

          <input type="submit" value="submit" className={styles.submit} />
        </form>
      </div>

      <Modal modalStatus={alertModalStatus} setModalStatus={setAlertModalStatus}>
        <AlertModal setAlertModalStatus={setAlertModalStatus} modalMode={EnumAlertModalData.ERROR} />
      </Modal>
    </>
  );
};
