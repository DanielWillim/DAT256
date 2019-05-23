import React from 'react';

export default function GameOver({ answer, onNext, points }) {
  return (
    <React.Fragment>
      <h1>
        GAME OVVER!
      </h1>
      <br />
      <h1>
        Rätt svar var &quot;
        {answer.join('" eller "')}
        &quot;!
      </h1>
      <br />
      <button type="button" onClick={onNext}>Starta om!</button>
      <br />
      <br />
      <h1>
        Du fick&nbsp;
        {points}
        &nbsp;poäng!
      </h1>
    </React.Fragment>
  );
}
