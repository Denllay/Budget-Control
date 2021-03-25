import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useActions } from '@/hooks/useActions';
import { IPropsModalComponent } from '@/types/Modal';
import styles from './AuthModal.module.scss';

type IInput = {
  email: string;
  password: string;
  confirmPassword: string;
};
export const RegisterModal: React.FC<IPropsModalComponent> = ({ closeModal }) => {
  const { register, handleSubmit } = useForm<IInput>();
  const { RegAuth } = useActions();

  const onSubmit: SubmitHandler<IInput> = (data) => {
    const { password, email, confirmPassword } = data;
    const sucsess = /.+@.+\..+/i.test(email) && password.trim() === confirmPassword.trim();

    if (sucsess) {
      RegAuth({ email, password });
      closeModal();
    } else {
      console.log('Введите данные правильно');
    }
  };

  return (
    <div className={styles.content} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      <div className={styles.block_title}>Register</div>
      <form className={styles.block_form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          className={styles.block_form_input}
          placeholder="Email"
          name="email"
          autoComplete="off"
          ref={register({ required: true })}
        />
        <input
          type="password"
          className={styles.block_form_input}
          placeholder="Password"
          name="password"
          autoComplete="off"
          ref={register({ required: true, minLength: 6, pattern: /^[A-Za-z0-9@\_\.]+$/i })}
        />

        <input
          type="password"
          className={styles.block_form_input}
          placeholder="Confirm password"
          name="confirmPassword"
          autoComplete="off"
          ref={register({ required: true, minLength: 6, pattern: /^[A-Za-z0-9@\_\.]+$/i })}
        />

        <input type="submit" value="submit" className={styles.submit} />
      </form>
    </div>
  );
};
