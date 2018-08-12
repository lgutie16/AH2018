import React, { Component } from 'react';
import Ranking from './Ranking';
import axios from 'axios';


export default class RankingContainer extends Component {
  async componentDidMount() {
    const data = await this.getRanking();
  }

  getRanking() {
    const name = this.props.match.params.name || '' 
    return axios({ url:`http://localhost:3000/api/ranking/${name}`, method: 'get' })
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return <Ranking />;
  }
}
