import React, { Component } from 'react';

import App from 'App'

export default function Winning(props){
    return (
      <p>
        <h1>Grattis, rätt svar är "{props.answer.join('" eller "')}" och du svarade rätt!</h1>
        <button onClick={props.onNext}>Fler frågor!</button>
      </p>
    )
  }
