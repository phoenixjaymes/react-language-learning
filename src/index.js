import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
} from 'react-router-dom';

import { Provider } from './components/Context';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter basename="/lab/language-learning/">
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
