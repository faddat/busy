/* global window */
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import api from './steemAPI';

import MessagesWorker, { messagesReducer } from './messages';
import appReducers from './app/appReducers';
import authReducers from './auth/authReducers';
import commentsReducer from './comments/commentsReducer.js';
import feedReducers from './feed/feedReducers';
import postsReducers from './post/postsReducers';
import userProfileReducer from './user/userReducer';
import notificationReducer from './app/Notification/notificationReducers';
import bookmarksReducer from './bookmarks/bookmarksReducer';
import favoritesReducer from './favorites/favoritesReducers';
import editorReducer from './post/Write/EditorReducers';
import { responsiveReducer, mountResponsive } from './helpers/responsive';
import reblogReducers from './app/reblog/reblogReducers';

export const messagesWorker = new MessagesWorker();

if (process.env.NODE_ENV !== 'production') {
  window.steemAPI = api;
}

const reducers = combineReducers({
  app: appReducers,
  auth: authReducers,
  comments: commentsReducer,
  editor: editorReducer,
  posts: postsReducers,
  feed: feedReducers,
  userProfile: userProfileReducer,
  responsive: responsiveReducer,
  messages: messagesReducer,
  notifications: notificationReducer,
  bookmarks: bookmarksReducer,
  favorites: favoritesReducer,
  reblog: reblogReducers,
});

const middleware = [
  promiseMiddleware({
    promiseTypeSuffixes: [
      'START',
      'SUCCESS',
      'ERROR',
    ]
  }),
  thunk.withExtraArgument({
    messagesWorker,
    steemAPI: api,
  })
];

const enhancer = compose(
  applyMiddleware(...middleware),
  persistState('favorites')
);

if (process.env.ENABLE_LOGGER &&
  process.env.IS_BROWSER &&
  process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger({
    collapsed: true,
    duration: true,
    stateTransformer: state => JSON.parse(JSON.stringify(state))
  }));
}

const store = createStore(
  reducers,
  window.devToolsExtension && window.devToolsExtension(),
  enhancer
);

mountResponsive(store);
messagesWorker.attachToStore(store);
messagesWorker.start();

export default store;
