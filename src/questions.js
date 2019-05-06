import { shuffle } from 'lodash/fp';

export const questions = [
  {
    question: 'Stanner denna buss vid teknikgatan?',
    answers: [
      ['Ja, i varje tur', true],
      ['Ja, enbart på helger', false],
      ['Ja, enbart på vardagar', false],
      ['Ja, enbart tentaveckor, omtentaveckor och under mottagningen', false],
    ],
  },
  {
    question: 'Hur många spårvagnslinjer går det i Göteborg?',
    answers: [
      ['12', true],
      ['11', false],
      ['13', false],
      ['10', false],
    ],
  },
  {
    question: 'Vilken av följande är INTE en stadsdel i Göteborg?',
    answers: [
      ['Kålltorp', false],
      ['Hallonbergen', true],
      ['Majorna', false],
      ['Masthugget', false],
    ],
  },
  {
    question: 'När var Eurovision song contest senast i Göteborg?',
    answers: [
      ['2000', false],
      ['1975', false],
      ['1985', true],
      ['2014', false],
    ],
  },
  {
    question: 'Vem var Chalmers först kvinnliga student?',
    answers: [
      ['Vera Sandberg', true],
      ['Elisabeth Bennet', false],
      ['Anna Sundvall', false],
      ['Elin Silver', false],
    ],
  },
  {
    question: 'Vad heter statyn på Götaplatsen?',
    answers: [
      ['Poseidon', true],
      ['Pseudonymen', false],
      ['Presten', false],
      ['Panamaen', false],
    ],
  },
  {
    question: 'Vad har Valand fått sitt namn ifrån?',
    answers: [
      ['Völund', true],
      ['Valund', false],
      ['Velund', false],
      ['Vilund', false],
    ],
  },
  {
    question: 'Vad heter den långa gatan mellan kungsportsplatsen och götaplatsen?',
    answers: [
      ['Kungsportsavenyn', true],
      ['Götaplatsavenyn', false],
      ['Kungsportsgatan', false],
      ['Götaplatsgatan', false],
    ],
  },
  {
    question: 'Vad jobbade Sven Hultin med?',
    answers: [
      ['Rektor för Chalmers', true],
      ['Rektor för Göteborgs universitet', false],
      ['Rektor för KTH', false],
      ['Kårordförande för Chalmers Studentkår', false],
    ],
  },
];

export const randomQuestion = () => {
  const temp = questions[(Math.floor(Math.random() * questions.length))];
  return {
    question: temp.question,
    answers: shuffle(temp.answers),
  };
};
