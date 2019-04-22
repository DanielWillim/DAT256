import React from 'react';

export default function GameOver({ answer, onNext, points}) {
  return (
    <p>
        <h1>
            GAME OVVER! &quot;
        </h1>
        <br />
        <h1>
            Rätt svar var{answer.join('" eller "')}
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
    </p>
  );
}
