import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu , Icon } from 'antd';
import Routes from './Routes';
import './App.less';
import MenuItem from 'antd/lib/menu/MenuItem';

const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>user</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="picture" />
            <span>Places</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="profile" />
            <span>Events</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="team" />
            <span>Persons</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
     
        <Header>
          <h1><strong>MiAgora</strong></h1>
         {/*    { <Menu theme="dark" mode="horizontal">
          <Menu.Item key="name">
            <span>MiAgora</span>
          </Menu.Item>
         <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="ranking">
            <Link to="/ranking">Ranking</Link>
          </Menu.Item> 
        </Menu> }*/}
        </Header>
        
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
        <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
        
          <Routes />
        </Content>
      </Layout>
    </Layout>




     
    );
  }
}

export default App;
