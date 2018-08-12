import React, { Component } from 'react';
import { Spin, Row, Col } from 'antd';
import PlayersRanking from './PlayersRanking';
import { getRequest } from '../../../RequestMethods';
import axios from 'axios';

export default class PlayersRankingContainer extends Component {
  state = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    this.getRanking();
  }

  getRanking = () => {
    return getRequest(`http://localhost:3000/api/ranking`)
      .then(response => {
        this.setState({
          data: response || [],
          loading: false,
        });
        return response;
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { data, loading } = this.state;

    const error = data.length === 0;

    return (
      <Row>
        {loading && <Spin />}
        {error && !loading && <div>There is not data to show</div>}
        {!loading &&
          !error && (
            <Col offset={8} span={8}>
              <PlayersRanking {...this.state} />
            </Col>
          )}
      </Row>
    );
  }
}
