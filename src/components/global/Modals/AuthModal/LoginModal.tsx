import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useActions } from '@/hooks/useActions';
import { IPropsModalComponent } from '@/types/Modal';
import styles from './AuthModal.module.scss';

type IInput = {
  email: string;
  password: string;
};
export const LoginModal: React.FC<IPropsModalComponent> = ({ closeModal }) => {
  const { register: login, handleSubmit } = useForm<IInput>();
  const { LoginAuth } = useActions();

  const onSubmit: SubmitHandler<IInput> = (data) => {
    const { password, email } = data;
    const sucsess = /.+@.+\..+/i.test(email);
    if (sucsess) {
      LoginAuth({ password, email });
      closeModal();
    } else {
      console.log('Введите данные правильно');
    }
  };

  return (
    <div className={styles.content} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      <div className={styles.block_title}>Login</div>
      <form className={styles.block_form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          className={styles.block_form_input}
          placeholder="Email"
          name="email"
          autoComplete="off"
          ref={login({ required: true })}
        />
        <input
          type="password"
          className={styles.block_form_input}
          placeholder="Password"
          name="password"
          autoComplete="off"
          ref={login({ required: true, minLength: 6, pattern: /^[A-Za-z0-9@\_\.]+$/i })}
        />
        <input type="submit" value="submit" className={styles.submit} />
      </form>
    </div>
  );
};
