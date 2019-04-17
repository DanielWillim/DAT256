import React, { Component } from 'react';

export default class Answer extends Component {
  constructor() {
    super();
}
  onAnswer=()=>{this.props.onAnswer(this.props.isCorrect)}

  render() {
    return (
      <div onClick={this.onAnswer}>
       {this.props.answer} 
      </div>
    );
  }

}
