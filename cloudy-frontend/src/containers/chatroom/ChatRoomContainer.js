import React, { Component } from "react";
import ChatRoom from "components/chatroom/ChatRoom";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import storage from "lib/storage";
import * as chatActions from "store/modules/chat";
import { bindActionCreators } from "redux";
import ChatRoomMessageInputContainer from "containers/chatroom/ChatRoomMessageInputContainer";

// ChatRoomMessageInputContainer과 ChatRoomContainer을
// 합칠까를 생각했지만 합칠 경우 코드량이 현저하게 많이 늘어날꺼 같고
// 재사용성에서 불편할꺼 같은 이유로 나눠서 처리하기로함.
// 이로인해 생길수 있는 문제는 코드를 파악하는데 시간이 오래 걸릴꺼 같다라는 것임.

// ChatRoomMessageInputContainer에서는 state에 데이터 셋팅하고,
// ChatRoomContainer state에 있는 데이터를 가져와서 보여주는걸 하는 역할임.

let socket = "";

class ChatRoomContainer extends Component {
  constructor() {
    super();
    this.nickname = storage.get("loggedNickname");

    //chatroom으로 사용자가 들어올때만 socket을 만들어준다.
    socket = socketIOClient("www.cloudy.ga:4000");
    socket.on("chat message", (msg, userID) => {
      const { ChatActions } = this.props;
      console.log("chat message Listen");
      ChatActions.listenChatMessage({ msg, userID });
    });
  }
  componentWillMount() {
    // 데이터가 변했을때 페이지 상에서 스크롤이 최하단에 위치하도록 셋팅함.
    const docScrollHeight = document.documentElement.scrollHeight;
    document.documentElement.scrollTop = docScrollHeight;

    const { match, ChatActions } = this.props;
    const urlArray = match.url.split("/");

    ChatActions.setSocket({ socket });

    socket.emit("join room", urlArray[2], this.nickname);
    ChatActions.getChatMessageList({ roomID: urlArray[2] });
  }

  componentDidUpdate(prevProps, prevState) {
    // 데이터가 변했을때 페이지 상에서 스크롤이 최하단에 위치하도록 셋팅함.
    const docScrollHeight = document.documentElement.scrollHeight;
    document.documentElement.scrollTop = docScrollHeight;
  }

  componentDidMount() {
    const { history } = this.props;
    const loggedNickname = storage.get("loggedNickname");

    if (!loggedNickname) {
      history.push("/access"); // 로그인 정보가 없다면 여기서 멈춥니다.
    }
  }

  componentWillUnmount() {
    //chatroom페이지에서 사용자가 벗어나면 기존의 socket을 연결 해지함.
    socket.disconnect();
  }

  render() {
    const { chatList, chatMessage } = this.props;

    return (
      <div>
        <ChatRoom chatList={chatList} />
        <ChatRoomMessageInputContainer
          socket={socket}
          chatMessage={chatMessage}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    // socket: state.chat.get("socket"),
    chatId: state.chat.get("chatId"),
    chatMessage: state.chat.get("chatMessage"),
    timestamp: state.chat.get("timestamp"),
    who_send: state.chat.get("who_send"),
    chatList: state.chat.get("chatList")
  }),
  dispatch => ({
    ChatActions: bindActionCreators(chatActions, dispatch)
  })
)(withRouter(ChatRoomContainer));
