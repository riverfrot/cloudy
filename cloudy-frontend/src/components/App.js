import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Home,
  EditorPage,
  LoginPage,
  RegisterPage,
  ChatRoomPage,
  ChatRoomListPage,
  AboutPage,
  PostPage,
  UserInfoPage,
  NotFoundPage,
  AccessPage
} from "pages";

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Cloudy - 익명채팅&게시판</title>
        </Helmet>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home/:page" component={Home} />
          <Route path="/about" component={AboutPage} />
          <Route path="/chatroomlist" component={ChatRoomListPage} />
          <Route path="/chatroom/:id" component={ChatRoomPage} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="/editor" component={EditorPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/userinfo" component={UserInfoPage} />
          <Route path="/access" component={AccessPage} />
          <Route path="*" exact={true} component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
