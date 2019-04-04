import React from "react";
import ChatRoomContainer from "containers/chatroom/ChatRoomContainer";

const ChatRoomPage = ({ match }) => {
  return <ChatRoomContainer match={match} />;
};

export default ChatRoomPage;
