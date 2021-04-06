import React, { useState } from 'react';
import { TProfileView } from './types/profileTypes';
import { ProfileMain } from './ProfileMain/ProfileMain';
import { useActions } from '@/hooks/useActions';
import { ProfileChangePassword } from './ProfileChangePassword/ProfileChangePassword';
import { IPropsModalComponent } from '@/types/Modal';

export const ProfileModal: React.FC<IPropsModalComponent> = () => {
  const [profileView, setProfileView] = useState<TProfileView>('view');
  const { SignOutAuth } = useActions();

  return (
    <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      {profileView === 'view' ? (
        <ProfileMain onClickSignOut={SignOutAuth} setProfileView={setProfileView} />
      ) : (
        <ProfileChangePassword setProfileView={setProfileView} />
      )}
    </div>
  );
};
