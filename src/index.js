import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import steemconnect from 'steemconnect';
import routes from './routes';
import store from './store';
import { isSmall } from './helpers/responsive';
import { HIDE_SIDEBAR } from './actions';

if (process.env.SENTRY_PUBLIC_DSN) {
  const Raven = require('raven-js');
  Raven
    .config(process.env.SENTRY_PUBLIC_DSN)
    .install();
}

if (process.env.STEEMCONNECT_HOST) {
  steemconnect.init({
    app: 'busy.org',
    baseURL: process.env.STEEMCONNECT_HOST,
    callbackURL: process.env.STEEMCONNECT_REDIRECT_URL
  });
}

browserHistory.listen(() => {
  if (isSmall()) {
    store.dispatch({
      type: HIDE_SIDEBAR,
    });
  }
});


// load the stylesheet
require('./styles/base.scss');

ReactDOM.render(
  <Provider store={store}>
    <Router
      routes={routes}
      history={browserHistory}
    />
  </Provider>,
  document.getElementById('app')
);
