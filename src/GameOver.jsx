import React from 'react';

export default function GameOver({ answer, onNext, points, onExit }) {
  return (
    <p>
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
      <button type="button" onClick={onExit}>Avsluta</button>
      <br />
      <br />
      <h1>
        Du fick&nbsp;
        {points}
        &nbsp;poäng!
      </h1>
    </p>
  );
}
