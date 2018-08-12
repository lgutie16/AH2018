import React, { PureComponent } from 'react';
import MovesList from './components/MovesList';
import { Row, Col, Divider, List, Spin, Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

const avatarRef =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Ua1kNXKh-SwzIt9jQtkDR9dbRK3jS-zkDLN2pPPBvDBgFuJDjA';

const MoveImageStyle = {
  height: '30px',
  width: '30px',
};

const CoverImageStyle = {
  minHeight: 393,
  maxHeight: 393,
};

const Disabled = {
  opacity: '0.5',
  pointerEvents: 'none',
};

const Counter = ['zero', 'one', 'two', 'three'];

const RulesList = ({ rules }) => {
  return rules.map(rule => {
    const { name } = rule;
    return (
      <option value={name} key={name}>
        {name}
      </option>
    );
  });
};

const PlayerCard = ({ current, name, count, onClick, color }) => {
  const styles = current ? { ...MoveImageStyle, ...Disabled } : MoveImageStyle;
  return (
    <Card
      style={{ width: 300, background: color, color: 'white' }}
      cover={
        <img src={require(`./img/${count}.png`)} style={CoverImageStyle} />
      }
      actions={[
        <img
          src={require('./img/paper.png')}
          style={styles}
          name="paper"
          onClick={onClick}
        />,
        <img
          src={require('./img/rock.png')}
          style={styles}
          name="rock"
          onClick={onClick}
        />,
        <img
          src={require('./img/scissors.png')}
          style={styles}
          name="scissors"
          onClick={onClick}
        />,
      ]}
    >
      <Meta
        avatar={<Avatar src={avatarRef} />}
        title={name}
        description="Player"
      />
    </Card>
  );
};

class Game extends PureComponent {
  makeMove = event => {
    const { makeMove } = this.props;
    const move = event.target.name;
    makeMove(move);
  };

  render() {
    const {
      rules = [],
      movesRecord = [],
      currentPlayer = '',
      player1,
      player2,
      ...rest
    } = this.props;

    const currentPlayerIndicator = `player${currentPlayer + 1}`;
    const currentPlayerName = this.props[currentPlayerIndicator].name;

    const auxSwitch = !(currentPlayer === 0 || currentPlayer === false);
    const isPlayer1Inactive = auxSwitch ? true : false;
    const isPlayer2Inactive = !auxSwitch ? true : false;

    return (
      <div>
        <Row>
          <Col offset={4} span={16}>
            <h1>Welcome to game of drones</h1>
            <Divider />
            Current player: {currentPlayerName}
          </Col>
        </Row>
        <Row>
          <Col offset={8} span={4}>
            <PlayerCard
              current={isPlayer1Inactive}
              name={player1.name}
              count={Counter[player1.wins]}
              onClick={this.makeMove}
              color="blue"
            />
          </Col>
          <Col offset={0} span={4}>
            <PlayerCard
              current={isPlayer2Inactive}
              name={player2.name}
              count={Counter[player2.wins]}
              onClick={this.makeMove}
              color="red"
            />
          </Col>
        </Row>
        <Row>
          <Col offset={4} span={16}>
            <Divider />
            <span>Moves log</span>
            <Row>
              <Col offset={6} span={22}>
                <MovesList
                  movesRecord={movesRecord}
                  {...rest}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Game;
