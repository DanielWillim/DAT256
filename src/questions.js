import { shuffle } from 'lodash/fp';

export const questions = [
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
  {
    question: 'Hur många lägen finns det på hållplatsen på Brunnsparken?',
    answers: [
      ['13', true],
      ['10', false],
      ['8', false],
      ['6', false],
    ],
  },

  {
    question: 'Vad heter bron i Göteborg som ska bytas ut mot en ny bro?',
    answers: [
      ['Götaälvsbron', true],
      ['Älvsborgsbron', false],
      ['Tingstadstunneln', false],
      ['Hisingsbron', false],
    ],
  },
  {
    question: 'Vad heter den central parken nära Centralstationen?',
    answers: [
      ['Trädgårdsföreningen i Göteborg', true],
      ['Göteborgs botaniska trädgård', false],
      ['Centralparken', false],
      ['Ängsgårdsbergen', false],
    ],
  },
  {
    question: 'Vad kallas ryttarstatyn som finns vid kungsportsplatsen?',
    answers: [
      ['Kopparmärra', true],
      ['Bronsryttaren', false],
      ['Gustaf Adolf', false],
      ['Kopparryttaren', false],
    ],
  },
  {
    question: 'Vilket år eldhärjades Centralstationen?',
    answers: [
      ['1923', true],
      ['1914', false],
      ['1891', false],
      ['1876', false],
    ],
  },
  {
    question: 'Vad hette gatan amerikaemigranterna utgick från under 1800- och 1900-talet?',
    answers: [
      ['Sillgatan', true],
      ['Postgatan', false],
      ['Kronhusgatan', false],
      ['Nordstjärnegatan', false],
    ],
  },
  {
    question: 'Vad heter torget som ligger vid Brunnsparken?',
    answers: [
      ['Lilla torget', true],
      ['Hamntorget', false],
      ['Kortedala torg', false],
      ['Brunnsbo torg', false],
    ],
  },
  {
    question: 'Vilka bussar kör mellan Chalmers två campus, Johanneberg och Lindholmen?',
    answers: [
      ['16 och 55', true],
      ['16, 17 och 55', false],
      ['17 och 55', false],
      ['16 och 17', false],
    ],
  },
  {
    question: 'Var har det gått linbana i Göteborg?',
    answers: [
      ['Mellan Liseberg och Götaplatsen', true],
      ['Mellan Backa och Kortedala', false],
      ['Mellan Järntorget och Hisingen', false],
      ['Mellan Svingeln och Brunnsbo', false],
    ],
  },
  {
    question: 'Vilken statsdel i Göteborg krävde flest ködagar på Boplats.se under Januari-Mars 2019?',
    answers: [
      ['Majorna-Linné', true],
      ['Örgryte-Härlanda', false],
      ['Lundby', false],
      ['Centrum', false],
    ],
  },
  {
    question: 'När grundades Chalmers?',
    answers: [
      ['1829', true],
      ['1954', false],
      ['1823', false],
      ['1947', false],
    ],
  },
  {
    question: 'När grundades Göteborgs universitet?',
    answers: [
      ['1954', true],
      ['1679', false],
      ['1823', false],
      ['1574', false],
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
