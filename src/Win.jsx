import React from 'react';

export default function Winning({ answer, onNext, points }) {
  return (
    <p>
      <h1>
        Grattis, rätt svar är &quot;
        {answer.join('" eller "')}
        &quot; och du svarade rätt!
      </h1>
      <br />
      <button type="button" onClick={onNext}>Fler frågor!</button>
      <br />
      <br />
      <h1>
        Du har&nbsp;
        {points}
        &nbsp;poäng!
      </h1>
    </p>
  );
}
