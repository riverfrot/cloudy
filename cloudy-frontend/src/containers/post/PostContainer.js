import React, { Component } from "react";
import Post from "components/post/Post";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as postActions from "store/modules/post";
import * as commonActions from "store/modules/common";

class PostContainer extends Component {
  initialize = async () => {
    const { PostActions, id } = this.props;
    try {
      await PostActions.getPost(id);
      const { post } = this.props;
      const { publisher, body } = post.toJS();

      this.isPublisher(publisher, body);
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.initialize();
  }

  componentWillUnmount() {
    const { PostActions } = this.props;
    PostActions.initialize();
  }

  isPublisher = (publisher, body) => {
    const { CommonActions } = this.props;
    CommonActions.checkPublisher({ publisher, body });
  };

  render() {
    const { loading, post } = this.props;

    if (loading) return null; // 로딩 중일 때는 아무것도 보여 주지 않음

    const { title, body, publishedDate, tags, publisher } = post.toJS();

    return (
      <div>
        <Post
          title={title}
          body={body}
          publishedDate={publishedDate}
          tags={tags}
          publisher={publisher}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    post: state.post.get("post"),
    loading: state.pender.pending["post/GET_POST"] // 로딩 상태
  }),
  dispatch => ({
    PostActions: bindActionCreators(postActions, dispatch),
    CommonActions: bindActionCreators(commonActions, dispatch)
  })
)(withRouter(PostContainer));
