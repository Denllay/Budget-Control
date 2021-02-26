import React, { useContext } from 'react';
import { ProfileContext } from '@/context/ProfileContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './ProfModuleSettingsPass.module.scss';
import { useActions } from '@/hooks/useActions';
type TInputs = {
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
};
export const ProfModuleSettingsPass = () => {
  const { setProfileView } = useContext(ProfileContext);
  const { UpdatePassword } = useActions();
  const { register, handleSubmit } = useForm<TInputs>();
  const onSubmit: SubmitHandler<TInputs> = (data) => {
    const { currentPassword, newPassword, confirmPassword } = data;
    newPassword.trim() === confirmPassword.trim() && UpdatePassword({ currentPassword, newPassword });
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.button_back} onClick={() => setProfileView('settings')}>
        Back
      </button>
      <div className={styles.container}>
        <div className={styles.container_title}>Update Password</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="currentPassword"
            placeholder="Current password"
            ref={register({ required: true })}
            className={styles.input}
          />
          <input
            name="newPassword"
            placeholder="New password"
            ref={register({ required: true, minLength: 6, pattern: /^[A-Za-z0-9]+$/i })}
            className={styles.input}
          />
          <input
            name="confirmPassword"
            placeholder="Confirm password"
            ref={register({ required: true, minLength: 6, pattern: /^[A-Za-z0-9]+$/i })}
            className={styles.input}
          />
          <input type="submit" className={styles.submit} />
        </form>
      </div>
    </div>
  );
};
