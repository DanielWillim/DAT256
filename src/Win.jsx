import React, { Component } from 'react';

import App from 'App'

export default function Winning(props){
    return (
      <p>
        <h1>Grattis du hade rätt!</h1>
        <button onClick={props.onNext}>Fler frågor!</button> 
      </p>
    )
  }

