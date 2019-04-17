import React, { Component } from 'react';

import App from 'App'

export default function Winning(props){
    return (
      <p>
        <h1>Grattis, rätt svar är "{props.answer.join('" eller "')}" och du svarade rätt!</h1>
        <br />
        <button onClick={props.onNext}>Fler frågor!</button>
        <br />
        <br />
        <h1>Du har {props.points} poäng!</h1>
      </p>
    )
  }
