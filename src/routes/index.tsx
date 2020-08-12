import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import PackagesDashboard from '../pages/PackagesDashboard';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/packages" component={PackagesDashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
