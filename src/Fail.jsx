import React from 'react';

export default function Fail({
  answer,
  onNext,
  points,
  timer,
}) {
  return (
    <div>
      <center>
        <font face="Thoma" size="19" color="red">
          <b>Fail!</b>
          <br />
          <i>
            Fel svar, det rätta svaret är &quot;
            {answer.join('" eller "')}
            &quot;
          </i>
          <br />
          <button type="button" onClick={onNext}>Fler frågor!</button>
          <br />
          <i>
            Du har&nbsp;
            {points}
            &nbsp;poäng!
          </i>
          <i>
            Du har&nbsp;
            {timer / 1000}
            &nbsp;sekunder kvar!
          </i>
        </font>
      </center>
    </div>
  );
}
