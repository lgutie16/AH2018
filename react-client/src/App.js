import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import Routes from './Routes'
import './App.less'

const { Header, Sider, Content } = Layout

class App extends Component {
  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <Layout>
        <Header style={{ color: '#fff' }}>It's me Catie and this is what I like</Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280
          }}
        >
          <Routes />
        </Content>
      </Layout>
    )
  }
}

export default App
