import React, { Component } from "react";
import ContentHeader from "components/common/ContentHeader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as postActions from "store/modules/post";
import * as commonActions from "store/modules/common";
import storage from "lib/storage";

class ContentHeaderContainer extends Component {
  handleRemove = async () => {
    const { PostActions, id, history } = this.props;
    try {
      // 포스트 삭제 후, 모달 닫고 웹 사이트로 이동
      await PostActions.removePost(id);
      // PostActions.removePost(id);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  handleModalOpen = () => {
    const { PostActions } = this.props;
    PostActions.changeModalOpen();
  };

  handleModalClose = () => {
    const { PostActions } = this.props;
    PostActions.changeModalClose();
  };
  componentDidMount() {
    const { history, match, CommonActions } = this.props;
    const loggedNickname = storage.get("loggedNickname"); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    const url = match.url;
    const POST_STRING = "post";

    if (!loggedNickname) {
      if (url.indexOf(POST_STRING) !== -1) {
      } else {
        history.push("/"); // 로그인 정보가 없다면 여기서 멈춥니다.
      }
    } else {
      if (url.indexOf(POST_STRING) !== -1) {
      } else {
        CommonActions.checkEditorPage();
        // history.push("/"); // 로그인 정보가 없다면 여기서 멈춥니다.
      }
    }
  }

  render() {
    const { handleRemove, handleModalOpen, handleModalClose } = this;
    const { modalState, isPublisher, isEditorPage } = this.props;

    return (
      <div>
        <ContentHeader
          onRemove={handleRemove}
          modalState={modalState}
          onModalOpen={handleModalOpen}
          onModalClose={handleModalClose}
          isPublisher={isPublisher}
          isEditorPage={isEditorPage}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    modalState: state.post.get("modalState"),
    post: state.post.get("post"),
    isPublisher: state.common.get("isPublisher"),
    isEditorPage: state.common.get("isEditorPage")
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch),
    CommonActions: bindActionCreators(commonActions, dispatch)
  })
)(withRouter(ContentHeaderContainer));
