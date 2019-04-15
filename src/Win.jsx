import React, { Component } from 'react';

import App from 'App'

let test = 0;

export default class Winning extends Component {

  state ={test:0}

  handleClick=()=>{
    console.log('The link was clicked.');
    this.setState({test:1})
  }

  render() {
    if (this.state.test == 0)
    return (
      <p>
        <h1>Grattis du hade rätt!</h1>
        <button onClick={this.handleClick}>test!!!</button> 
      </p>
    );
    else
    return (
    <App />
    )
  }
}
