import React, { Component } from 'react';

export default class Winning extends Component {
  handleClick() {
    console.log('The link was clicked.');
  }

  render() {
    return (
      <p>
        <h1>Grattis du hade rätt!</h1>
        <button onClick={this.handleClick}>test</button>
      </p>
    );
  }
}
