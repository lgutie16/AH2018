import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './routes/Home';
import  Game  from './routes/Game';
import  Ranking from './routes/Ranking';
import NoMatch from './routes/NoMatch'

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/game" component={Game} />
      <Route exact path="/ranking" component={Ranking} />
      <Route path="/ranking/:name" component={Ranking} />
      <Route path="/no-match" component={NoMatch} />
      <Route component={NoMatch} />      
    </Switch>
  );
}
