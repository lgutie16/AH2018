import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

// TODO you could refactor this component, please.
class PlayForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: {
        player1: false,
        player2: false,
      },
    };
  }

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;

    let nameValid =
      value.match('[a-zA-Z]+') && value.length >= 2 && value.length < 12;

    fieldValidationErrors[fieldName] = nameValid ? '' : ' is invalid';

    this.setState(
      {
        formErrors: fieldValidationErrors,
      },
      () => this.validateForm()
    );
  };

  validateForm = () => {
    this.setState({ formValid: this.state.player1 && this.state.player2 });
  };

  setPlayer = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  startToPlay = () => {
    const { player1, player2, formValid } = this.state;

    if (!formValid) return;

    this.props.history.push('/game', {
      player1: player1,
      player2: player2,
    });
  };

  render() {
    return (
      <div>
        <h2>Players information</h2>
        <FormItem>
          <Input
            type="text"
            placeholder="Name player 1"
            name="player1"
            onChange={this.setPlayer}
          />
          {this.state.formErrors.player1}
        </FormItem>
        <FormItem>
          <Input
            type="text"
            placeholder="Name player 2"
            name="player2"
            onChange={this.setPlayer}
          />
          {this.state.formErrors.player2}
        </FormItem>

        <Button type="primary" htmlType="button" disabled={!this.state.formValid} onClick={this.startToPlay}>
          Play
        </Button>
      </div>
    );
  }
}

export default withRouter(PlayForm);
