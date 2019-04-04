import React, { Component } from "react";
import ChatRoomMessageInput from "components/chatroom/ChatRoomMessageInput";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import storage from "lib/storage";
import * as chatActions from "store/modules/chat";

class ChatRoomMessageInputContainer extends Component {
  constructor() {
    super();
    this.nickname = storage.get("loggedNickname");
  }
  handleChatSend = () => {
    const { ChatActions, socket, chatMessage } = this.props;
    // 리듀서 쪽에서 데이터를
    // socket을 통해서 mongoDB에 데이터 저장하는 부분 작성해야함.

    // 메시지 보낸 후에 페이지 최하단에 스크롤이 위치하도록 셋팅.
    const docScrollHeight = document.documentElement.scrollHeight;
    document.documentElement.scrollTop = docScrollHeight;

    if (chatMessage !== "") {
      //채팅 메시지 보내는 부분.
      ChatActions.sendChatMessage({ msg: chatMessage, userID: this.nickname });
      socket.emit("chat message", chatMessage, this.nickname);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    const { ChatActions } = this.props;
    // console.log({ name, value });
    ChatActions.changeChatMessageInput({ name, value });
  };

  handleKeyPress = e => {
    // 엔터 키를 누르면 로그인 호출
    if (e.key === "Enter") {
      this.handleChatSend();
    }
  };
  render() {
    const { handleChatSend, handleChange, handleKeyPress } = this;
    const { chatMessage } = this.props;
    return (
      <ChatRoomMessageInput
        chatMessage={chatMessage}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onChatSend={handleChatSend}
      />
    );
  }
}

export default connect(
  state => ({
    chatMessage: state.chat.get("chatMessage"),
    timestamp: state.chat.get("tiemstamp"),
    who_send: state.chat.get("who_send")
  }),
  dispatch => ({
    ChatActions: bindActionCreators(chatActions, dispatch)
  })
)(ChatRoomMessageInputContainer);
