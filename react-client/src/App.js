import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Routes from './Routes';
import './App.less';

const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className="app">
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="ranking">
            <Link to="/ranking">Ranking</Link>
          </Menu.Item>
        </Menu>
        <Content>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Routes />
          </div>
        </Content>
      </div>
    );
  }
}

export default App;
