import React, { Component } from 'react';
import Game from './Game';
import { Modal } from '../../components';
import axios from 'axios';
import { get } from 'lodash';

export default class GameContainer extends Component {
  constructor(props) {
    super(props);
    const player1 = get(props, 'location.state.player1');
    const player2 = get(props, 'location.state.player2');
    this.state = {
      visible: false,
      rules: [
        {
          name: 'scissors',
        },
        { name: 'paper' },
        { name: 'rock' },
      ],
      currentPlayer: 0,
      controller: 1,
      round: 1,
      movesRecord: [],
      gameWinner: '',
      player1: {
        name: player1,
        identifier: 'player1',
        move: '',
        wins: 0,
      },
      player2: {
        name: player2,
        identifier: 'player2',
        move: '',
        wins: 0,
      },
      [player1]: { identifier: 'player1', color: 'blue' },
      [player2]: { identifier: 'player2',  color: 'red' },
      Tie: { identifier: 'tie',  color: 'white' }
    };
  }

  componentWillMount = () => {
    const isValidData =
      get(this.props, 'location.state.player1') &&
      get(this.props, 'location.state.player2');

    if (!isValidData) this.props.history.push('/');
  };

  switchModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  makeMove = move => {
    const {
      state,
      getMoveWinner,
      state: { currentPlayer, controller },
    } = this;

    this.setState(
      {
        [`player${currentPlayer + 1}`]: {
          ...state[`player${currentPlayer + 1}`],
          move,
        },
        currentPlayer: !currentPlayer,
        controller: controller + 1,
      },
      () => {
        if (controller % 2 === 0 && controller !== 0) getMoveWinner();
      }
    );
  };

  getMoveWinner = () => {
    const { player1, player2, round } = this.state;
    return axios({
      url: 'http://localhost:3000/api/play',
      method: 'post',
      data: { round, player1, player2 },
    })
      .then(response => {
        const { data } = response;
        this.setMoveWinner(data);
        return data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  setMoveWinner = data => {
    const { nextRound, gameWinner, player1, player2 } = data;
    this.setState(
      {
        movesRecord: [...this.state.movesRecord, data],
        round: nextRound,
        player1: {
          ...player1,
        },
        player2: {
          ...player2,
        },
        gameWinner: gameWinner
      },
      () => {
        if (gameWinner) {
          this.switchModal();
        }
      }
    );
  };

  setGameWinner = name => {
    return axios({
      url: 'http://localhost:3000/api/ranking',
      method: 'put',
      data: { name: name },
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
      });
  };

  cancelGame = () => {
    this.props.history.push('/');
  };

  reset = () => {
    const { player1, player2 } = this.state;
    this.setState({
      visible: false,
      currentPlayer: 0,
      controller: 1,
      round: 1,
      movesRecord: [],
      player1: {
        ...player1,
        move: '',
        wins: 0,
      },
      player2: {
        ...player2,
        move: '',
        wins: 0,
      },
    });
  };

  render() {
    const {
      state: { visible },
      cancelGame,
      switchModal,
      reset,
    } = this;

    return (
      <div>
        {visible && (
          <Modal
            title="Winner"
            visible={visible}
            onOk={reset}
            onCancel={cancelGame}
            okText={'Keep playing'}
            cancelText={'Get out of the game'}
          >
           {this.state.gameWinner} is the new Emperor 
          </Modal>
        )}
        <Game {...this.state} makeMove={this.makeMove} />
      </div>
    );
  }
}
