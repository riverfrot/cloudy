import React from "react";
import HeaderContainer from "containers/common/HeaderContainer";
import ChatRoomListContainer from "containers/list/ChatRoomListContainer";

const ChatRoomListPage = ({ match }) => {
  return (
    <div>
      <HeaderContainer match={match} />
      <ChatRoomListContainer />
    </div>
  );
};

export default ChatRoomListPage;
