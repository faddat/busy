import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Wrapper from './wrapper';
import Settings from './app/AppSettings';
import Page from './feed/Page';
import User from './user/User';
import Profile from './user/UserProfile';
import Followers from './user/UserFollowers';
import Following from './user/UserFollowing';
import Posts from './user/UserPosts';
import Replies from './user/UserReplies';
import Feed from './user/UserFeed';
import Transfers from './user/UserTransfers';
import Edit from './user/UserEdit';
import Tags from './tags/Tags';
import Donors from './donors/Donors';
import { Trending, Hot, Votes, Responses, Active, Created, Cashout } from './feed/PathMatching';
import PostSingle from './post/PostSingle';
import Bookmarks from './bookmarks/Bookmarks';
import Error404 from './statics/Error404';

var MessagesUser = require('./messages/MessagesUser').default,
  MessagesCategory = require('./messages/MessagesCategory').default,
  Write = require('./post/Write/Write').default;

export default (
  <Route path="/" component={Wrapper}>
    <IndexRoute component={Page} />
    <Route path="/settings" component={Settings} />
    <Route path="/tags" component={Tags} />
    <Route path="/donors" component={Donors} />
    <Route path="/trending(/:category)" component={Trending} />
    <Route path="/hot(/:category)" component={Hot} />
    <Route path="/cashout(/:category)" component={Cashout} />
    <Route path="/created(/:category)" component={Created} />
    <Route path="/active(/:category)" component={Active} />
    <Route path="/responses(/:category)" component={Responses} />
    <Route path="/votes(/:category)" component={Votes} />
    <Route path="/bookmarks" component={Bookmarks} />
    <Route path="/write" component={Write} />
    <Route path="/messages/@:username" component={MessagesUser} />
    <Route path="/messages/:category" component={MessagesCategory} />
    <Route component={User}>
      <Route path="/profile/edit" component={Edit} />
      <Route path="/@:name/posts" component={Posts} />
      <Route path="/@:name/feed" component={Feed} />
      <Route path="/@:name/replies" component={Replies} />
      <Route path="/@:name/followers" component={Followers} />
      <Route path="/@:name/followed" component={Following} />
      <Route path="/@:name/transfers" component={Transfers} />
      <Route path="/@:name" component={Profile} />
    </Route>
    <Route path="/:category/@:author/:permlink" component={PostSingle} />
    <Route path="/*" component={Error404} />
  </Route>
);
