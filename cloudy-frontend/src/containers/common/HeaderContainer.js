import React, { Component } from "react";
import { connect } from "react-redux";
import storage from "lib/storage";
import { bindActionCreators } from "redux";
import * as loginActions from "store/modules/login";
import * as chatroomActions from "store/modules/chatroom";
import HeaderComponent from "components/common/Header";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.nickname = storage.get("loggedNickname");
  }

  initializeUserInfo = async () => {
    const loggedInfo = storage.get("loggedNickname"); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if (!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

    const { LoginActions } = this.props;

    try {
      await LoginActions.checkStatus();
    } catch (e) {
      storage.remove("loggedNickname");
      window.location.href = "/login";
    }
  };

  componentDidMount() {
    this.initializeUserInfo();
    this.nickname = storage.get("loggedNickname");
  }
  handleUserLogout = () => {
    const { LoginActions } = this.props;
    storage.remove("loggedNickname");
    LoginActions.userLogout();
    window.location.href = "/";
  };

  onChangeInput = ({ value, name }) => {
    const { ChatRoomActions } = this.props;
    ChatRoomActions.changeInput({ value, name });
  };

  handleModalOpen = () => {
    const { ChatRoomActions } = this.props;
    ChatRoomActions.changeModalOpen();
  };

  handleModalClose = () => {
    const { ChatRoomActions } = this.props;
    ChatRoomActions.changeModalClose();
  };

  handleKeyPress = e => {
    // 엔터 키를 누르면 로그인 호출
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleSubmit = async () => {
    const { ChatRoomActions, history, roomID, title } = this.props;

    if (title !== "") {
      //채팅방 만드는 모달 닫을때 사용하는 리듀서 함수
      ChatRoomActions.changeModalClose();

      try {
        await ChatRoomActions.chatroomRegister({
          roomID,
          title
        });

        history.push(`/chatroom/${this.props.roomID}`);
      } catch (e) {
        console.log(e);
      }
    } else {
    }
  };

  render() {
    const {
      handleUserLogout,
      onChangeInput,
      handleSubmit,
      handleModalClose,
      handleModalOpen,
      handleKeyPress
    } = this;
    const { match, modalState } = this.props;

    return (
      <div>
        {match.path === "/login" ? (
          <Helmet>
            <title>Cloudy - 로그인</title>
          </Helmet>
        ) : match.path === "/register" ? (
          <Helmet>
            <title>Cloudy - 회원가입</title>
          </Helmet>
        ) : (
          ""
        )}

        <HeaderComponent
          match={match}
          nickname={this.nickname}
          handleUserLogout={handleUserLogout}
          onChangeInput={onChangeInput}
          onSubmit={handleSubmit}
          onModalClose={handleModalClose}
          onModalOpen={handleModalOpen}
          onKeyPress={handleKeyPress}
          modalState={modalState}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    roomID: state.chatroom.get("roomID"),
    title: state.chatroom.get("title"),
    createDate: state.chatroom.get("createDate"),
    modalState: state.chatroom.get("modalState")
  }),
  dispatch => ({
    LoginActions: bindActionCreators(loginActions, dispatch),
    ChatRoomActions: bindActionCreators(chatroomActions, dispatch)
  })
)(withRouter(HeaderContainer));
