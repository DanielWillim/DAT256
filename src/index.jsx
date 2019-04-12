import React from 'react';
import ReactDOM from 'react-dom';
import Fail from 'fail';

ReactDOM.render(
  <Fail>Hello World!</Fail>,
  document.getElementById('app'),
);

module.hot.accept();
