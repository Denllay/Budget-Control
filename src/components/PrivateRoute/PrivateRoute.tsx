import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { EnumAuthAction } from '@/store/types/Auth/Auth';
interface PrivateRouteProps extends RouteProps {
  component: React.FC;
  condition: EnumAuthAction;
  pathRedirect: string;
  trueCondition: EnumAuthAction;
}
// prettier-ignore
export const PrivateRoute = ({component: Component,condition,trueCondition,pathRedirect,...rest}: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        condition === trueCondition ? (
          <Component/>
        ) : (
          <Redirect
            to={{
              pathname: pathRedirect,
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};
