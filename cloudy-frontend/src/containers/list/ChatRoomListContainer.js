import React, { Component } from "react";
import ChatRoomList from "components/list/ChatRoomList";
import { connect } from "react-redux";
import * as listActions from "store/modules/list";
import { bindActionCreators } from "redux";
import LoadingView from "components/common/LoadingView";

class ChatRoomListContainer extends Component {
  getChatRoomList = () => {
    //페이지와 태그 값을 부모에게서 받아 옵니다.
    const { tag, page, ListActions } = this.props;
    ListActions.getCharRoomList({
      page,
      tag
    });
  };

  handleScroll = () => {
    const { isLoading, isLast, ListActions, chatrooms } = this.props;
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    let temp_isLoading = isLoading;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 100) {
      if (!isLoading && !isLast) {
        ListActions.setLoading();
        temp_isLoading = true;
        setTimeout(function() {
          if (temp_isLoading === true) {
            const nextPage = chatrooms.toJS().length / 16 + 1;
            ListActions.getCharRoomList({ page: nextPage, next: 1 });
            ListActions.initLoading();
            temp_isLoading = false;
          }
        }, 2000);
      }
    }
  };

  componentDidMount() {
    this.getChatRoomList();
    // 스크롤링 이벤트 추가
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    // 언마운트 될때에, 스크롤링 이벤트 제거
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const { chatrooms, isLoading } = this.props;

    return (
      <div>
        <ChatRoomList chatrooms={chatrooms} />
        <LoadingView isLoading={isLoading} />
      </div>
    );
  }
}

export default connect(
  state => ({
    lastPage: state.list.get("lastPage"),
    chatrooms: state.list.get("chatrooms"),
    isLast: state.list.get("isLast"),
    isLoading: state.list.get("isLoading")
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(ChatRoomListContainer);
