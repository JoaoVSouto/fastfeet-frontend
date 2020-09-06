import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import PackagesDashboard from '../pages/PackagesDashboard';
import PackagesEdit from '../pages/PackagesEdit';
import PackagesCreation from '../pages/PackagesCreation';

import CouriersDashboard from '../pages/CouriersDashboard';
import CouriersCreation from '../pages/CouriersCreation';
import CouriersEdit from '../pages/CouriersEdit';

import RecipientsDashboard from '../pages/RecipientsDashboard';
import RecipientsCreation from '../pages/RecipientsCreation';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/packages" exact component={PackagesDashboard} isPrivate />
      <Route path="/packages/edit/:id" component={PackagesEdit} isPrivate />
      <Route path="/packages/create" component={PackagesCreation} isPrivate />

      <Route path="/couriers" exact component={CouriersDashboard} isPrivate />
      <Route path="/couriers/create" component={CouriersCreation} isPrivate />
      <Route path="/couriers/edit/:id" component={CouriersEdit} isPrivate />

      <Route
        path="/recipients"
        exact
        component={RecipientsDashboard}
        isPrivate
      />
      <Route
        path="/recipients/create"
        component={RecipientsCreation}
        isPrivate
      />

      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
