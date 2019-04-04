import React, { Component } from "react";
import PostHeader from "components/post/PostHeader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as postActions from "store/modules/post";
import * as commonActions from "store/modules/common";
import { Helmet } from "react-helmet";

class PostHeaderContainer extends Component {
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

  render() {
    const { handleRemove, handleModalOpen, handleModalClose } = this;
    const { modalState, isPublisher, id } = this.props;

    return (
      <div>
        <Helmet>
          <title>Cloudy - 익명 게시글</title>
        </Helmet>

        <PostHeader
          onRemove={handleRemove}
          modalState={modalState}
          onModalOpen={handleModalOpen}
          onModalClose={handleModalClose}
          isPublisher={isPublisher}
          postId={id}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    modalState: state.post.get("modalState"),
    post: state.post.get("post"),
    isPublisher: state.common.get("isPublisher")
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch),
    CommonActions: bindActionCreators(commonActions, dispatch)
  })
)(withRouter(PostHeaderContainer));
