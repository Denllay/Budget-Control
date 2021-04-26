import React from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Redirect } from 'react-router-dom';
import { EnumAuthAction } from '@/types/Auth';
import { Route } from 'react-router-dom';

interface IProps {
  path: string;
}

export const RoutePrivate: React.FC<IProps> = ({ children, path }) => {
  const authStatus = useTypedSelector((state) => state.auth.status);

  if (authStatus === EnumAuthAction.AUTH_ENTERED) {
    return <Route path={path}>{children}</Route>;
  }

  return <Redirect to="/" />;
};
