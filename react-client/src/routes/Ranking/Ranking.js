import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PlayersRanking from './PlayersRanking'
import PlayerRanking from './PlayerRanking'

const Ranking = () => (
  <Switch>
    <Route exact path='/ranking' component={PlayersRanking}/>
    <Route path='/ranking/:name' component={PlayerRanking}/>
  </Switch>
)

export default Ranking
