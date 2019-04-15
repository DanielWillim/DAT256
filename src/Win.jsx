import React, { Component } from 'react';

import App from 'App'

export default class Winning extends Component {

  state ={nextQuestion:0}

  handleClick=()=>{
    console.log('The link was clicked.');
    this.setState({nextQuestion:1})
  }

  render() {
    if (this.state.nextQuestion == 0)
    return (
      <p>
        <h1>Grattis du hade rätt!</h1>
        <button onClick={this.handleClick}>Fler frågor!</button> 
      </p>
    );
    else
    return (
    <App />
    )
  }
}
