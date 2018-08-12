import React from 'react'
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
const Option = Select.Option;


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
  <Select name={name} defaultValue="no" style={{ width: 120 }} onChange={onChange}>
    <Option value="no">Si</Option>
    <Option value="si">No</Option>
  </Select>
)

class Home extends React.Component {
  state = {
    cultura: false,
    deporte: false,
    categories: [],
    events: []
  }

  onChange = event => {
    const name = event.target.name
    const value = event.target.value
    console.log(name, value)
    this.setState({
      [value]: value
    })
  }

  getPreferences = async () => {
    const { data } = this.state
    const favoutiteCategories = await postRequest(
      `http://localhost:3000/categories`,
      data
    )
      .then(response => {
        this.setState({
          categories: response
        })
        return response
      })
      .catch(error => {
        console.log(error)
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
          <Col offset={6} span={6}>
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
              name={'Community & Culture'}
              onChange={this.onChange}
            />
            <br />
            <br />
            <Button type="primary" style={{ width: 190 }} block>
              Get my preferences
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home
