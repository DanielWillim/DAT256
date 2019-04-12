import React from 'react';
import ReactDOM from 'react-dom';
import Win from 'Win';
import Fail from 'fail';

ReactDOM.render(
  <Win />,
  document.getElementById('app'),
);


module.hot.accept();
