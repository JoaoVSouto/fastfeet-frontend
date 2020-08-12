import React from 'react';
import {
  RouteProps,
  RouteComponentProps,
  Redirect,
  Route,
} from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

interface IProps extends RouteProps {
  component: React.FC<RouteComponentProps>;
  isPrivate?: boolean;
}

const RouteWrapper: React.FC<IProps> = ({
  component: Component,
  isPrivate = false,
  ...rest
}) => {
  const signed = false;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/packages" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default RouteWrapper;
