import React, { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useActions } from '@/hooks/useActions';
import { EnumAlertModalData, EnumAuthModalData, IPropsModalComponent } from '@/types/Modal';
import styles from './AuthModal.module.scss';
import { IInput } from './type';
import { CreateModal } from '@/utilities/CreateModal/CreateModal';
import { AlertModal } from '../AlertModal/AlertModal';

export const AuthModal: React.FC<IPropsModalComponent> = ({ closeModal, dataModal }) => {
  const { register: auth, handleSubmit, watch, errors } = useForm<IInput>();
  const { LoginAuth, RegAuth } = useActions();
  const { toggleModal: toggleModalError, ModalComponent } = CreateModal({
    component: AlertModal,
    dataModal: EnumAlertModalData.ERROR,
  });

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit: SubmitHandler<IInput> = (data) => {
    const { password, email } = data;

    dataModal === EnumAuthModalData.LOGIN
      ? LoginAuth({ password, email, toggleModalError, closeModal })
      : RegAuth({ password, email, toggleModalError, closeModal });
  };

  return (
    <div className={styles.content} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      <div className={styles.block_title}>
        {dataModal === EnumAuthModalData.LOGIN ? 'Login' : 'Registration'}
      </div>
      <form className={styles.block_form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="password"
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

        {dataModal === EnumAuthModalData.REGISTRATION && (
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
            {errors.confirmPassword && <p className={styles.text_alert}>{errors.confirmPassword.message}</p>}
          </>
        )}

        <input type="submit" value="submit" className={styles.submit} />
      </form>

      {ModalComponent}
    </div>
  );
};
