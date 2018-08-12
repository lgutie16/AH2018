import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './routes/Home';
import NoMatch from './routes/NoMatch'

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/no-match" component={NoMatch} />
      <Route component={NoMatch} />      
    </Switch>
  );
}
