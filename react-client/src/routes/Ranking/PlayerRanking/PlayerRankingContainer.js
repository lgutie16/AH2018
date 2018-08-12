import React, { Component } from 'react';
import PlayerRanking from './PlayerRanking';
import { Spin } from 'antd';
import axios from 'axios';
import { values } from 'lodash';
import { getRequest } from '../../../RequestMethods';
import { Modal } from '../../../components';

export default class PlayerRankingContainer extends Component {
  state = {
    data: [],
    name: '',
    loading: true,
    visible: true,
  };

  componentDidMount() {
    this.getRanking();
    const name = this.props.match.params.name;
  }

  swithModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  getRanking = () => {
    const name = this.props.match.params.name;

    return getRequest(`http://localhost:3000/api/ranking/${name}`, {
      name: name,
    })
      .then(response => {
        this.setState({
          data: response,
          name: name,
          loading: false,
        });
        return response;
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { visible, loading, data, swithModal } = this.state;
    const error = data && data.length === 0;
    return (
      <div>
        {loading && <Spin />}
        {error && !loading && <div>Player not found</div>}
        {!loading && !error && <PlayerRanking {...this.state} />}
      </div>
    );
  }
}
