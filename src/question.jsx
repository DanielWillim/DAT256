import React, { Component } from 'react';
import Answer from 'Answer';

export default class Question extends Component {
  constructor() {
      super();
  }
  render() {

    return (
      
      <div>
        <div> {this.props.question}
        </div>
        {this.props.answer.map(([text, isCorrect])=>(
          <Answer answer={text}
          onAnswer={this.props.onAnswer}
          isCorrect={isCorrect}
          />
        ))}
      </div>
    );
  }

}
