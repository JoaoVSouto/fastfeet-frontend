import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import PackagesDashboard from '../pages/PackagesDashboard';
import PackagesEdit from '../pages/PackagesEdit';
import PackagesCreation from '../pages/PackagesCreation';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/packages" exact component={PackagesDashboard} isPrivate />
      <Route path="/packages/edit/:id" component={PackagesEdit} isPrivate />
      <Route path="/packages/create" component={PackagesCreation} isPrivate />

      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
