import React from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Redirect } from 'react-router-dom';
import { EnumAuthAction } from '@/types/Auth';
import { Route } from 'react-router-dom';

interface IProps {
  path: string;
  exact: boolean;
}

export const RoutePrivate: React.FC<IProps> = ({ children, path, exact }) => {
  const authStatus = useTypedSelector((state) => state.auth.status);

  if (authStatus === EnumAuthAction.AUTH_ENTERED) {
    return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
    );
  }

  return <Redirect to="/Budget-Control" />;
};
