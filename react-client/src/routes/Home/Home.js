import React from 'react'
import {Link} from 'react-router-dom'
import {
  Row,
  Col,
  Divider,
  List,
  Spin,
  Card,
  Icon,
  Avatar,
  Layout,
  Menu,
  Button,
  Cascader,
  Select
} from 'antd'
import { getRequest, postRequest } from '../../RequestMethods'
const { Header, Sider, Content } = Layout
const { Meta } = Card
const Option = Select.Option

const options = [
  {
    value: 'No',
    label: 'No'
  },
  {
    value: 'Si',
    label: 'Si'
  }
]

const avatarRef =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Ua1kNXKh-SwzIt9jQtkDR9dbRK3jS-zkDLN2pPPBvDBgFuJDjA'

const coverImage =
  'https://imagenes.canalrcn.com/ImgNoticias/s3fs-public/noticias/silleteros11082013.jpg'

const MoveImageStyle = {
  height: '45px',
  width: '45px'
}

const CoverImageStyle = {
  minHeight: 393,
  maxHeight: 393
}

const Disabled = {
  opacity: '0.5',
  pointerEvents: 'none'
}

const Selector = ({ name, onChange }) => (
  <select
    name={name}
    defaultValue="default"
    style={{ width: 120 }}
    onChange={onChange}
  >
    <option value="default">Select an option</option>
    <option value="no">No</option>
    <option value="si">Si</option>
  </select>
)

class Home extends React.Component {
  state = {
    cultura: false,
    deporte: false,
    preferences: [],
    categories: [],
    events: []
  }

  onChange = event => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      preferences: [...this.state.preferences, name]
    })
  }

  getPreferences = async () => {
    const { preferences } = this.state

    const favoutiteCategories = await postRequest(
      `http://localhost:3000/categories`,
      { preferences: preferences }
    )
      .then(response => {
        return response
      })
      .catch(error => {
        console.log(error)
      })


    this.setState({
      categories: favoutiteCategories
    })

    const events = await postRequest(`http://localhost:3000/categories`)
      .then(response => {
        this.setState({
          events: response
        })
        return response
      })
      .catch(error => {
        console.log(error)
      })

    console.log(favoutiteCategories, events)
  }

  render() {
    const { getPreferences } = this
    return (
      <div>
        <Row>
          <Col offset={4} span={6}>
            <Card
              style={{ width: 340 }}
              cover={<img src={coverImage} style={CoverImageStyle} />}
              actions={[
                <img
                  src={'https://i.ytimg.com/vi/SSt_YHhM6RE/maxresdefault.jpg'}
                  name="paper"
                  style={MoveImageStyle}
                  onClick={getPreferences}
                />,
                <img
                  src={
                    'http://conceptodefinicion.de/wp-content/uploads/2016/09/Deporte.jpg'
                  }
                  style={MoveImageStyle}
                  name="rock"
                  onClick={getPreferences}
                />,
                <img
                  src={
                    'https://c8.alamy.com/comp/GD4TDT/ghoomar-dance-GD4TDT.jpg'
                  }
                  style={MoveImageStyle}
                  name="scissors"
                  onClick={getPreferences}
                />
              ]}
            >
              <Meta
                avatar={<Avatar src={avatarRef} />}
                title={'Catie'}
                description=""
              />
            </Card>
          </Col>

          <Col offset={1} md={6}>
            <span>Aventure</span>
            <br />
            <Selector
              size="small"
              options={options}
              name="Aventure"
              onChange={this.onChange}
            />
            <br />
            <span>Dance</span>
            <br />
            <Selector
              size="small"
              options={options}
              name={'Dance'}
              onChange={this.onChange}
            />
            <br />
            <span>Food</span>
            <br />
            <Selector
              size="small"
              options={options}
              name={'Food & Drink'}
              onChange={this.onChange}
            />
            <br />
            <span>Sport</span> <br />
            <Selector
              size="small"
              options={options}
              name={'Sport'}
              onChange={this.onChange}
            />
            <br />
            <span>Culture</span>
            <br />
            <Selector
              size="small"
              options={options}
              name={'Music'}
              onChange={this.onChange}
            />
            <br />
            <br />
            <Button
              type="primary"
              style={{ width: 190 }}
              block
              onClick={this.getPreferences}
            >
              Get my preferences
            </Button>
          </Col>
          <Col span={4}>
            <List
              size="small"
              header={<div>Your suggestion</div>}
              bordered
              dataSource={
                this.state.categories ? this.state.categories.preferences : []
              }
              renderItem={item => {
                return <List.Item>
                  {item.name}
                  <br />
                  <a href={item.resource_uri}> {"Click to see events about " + item.name } </a>
                  <br />
                </List.Item>
              }}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home
