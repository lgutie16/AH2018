import React, { Component } from 'react';
import { Rules, PlayForm } from './components';
import { Row, Col } from 'antd';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Row>
          <Col  xs={{span:20, offset: 2}} sm={{span:20, offset: 2}} md={{span:10, offset: 1}} lg={{span:10, offset: 1}} xl={{span:8, offset: 4}}   >
            <Rules />
          </Col>
          <Col xs={{span:20, offset: 2}} sm={{span:20, offset: 2}} md={{span:10, offset: 1}} lg={{span:10, offset: 1}} xl={{span:7, offset: 1}} >
            <PlayForm />
          </Col>
        </Row>
      </div>
    );
  }
}
