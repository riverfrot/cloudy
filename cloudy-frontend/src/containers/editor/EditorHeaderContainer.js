import React, { Component } from "react";
import EditorComponentHeader from "components/editor/EditorComponentHeader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as editorActions from "store/modules/editor";
import * as commonActions from "store/modules/common";
import storage from "lib/storage";
import queryString from "query-string";
import { Helmet } from "react-helmet";

class EditorHeaderContainer extends Component {
  handleSubmit = async () => {
    const {
      EditorActions,
      history,
      title,
      body,
      tags,
      publisher,
      location
    } = this.props;

    const post = {
      title,
      body,
      publisher,
      // 태그 텍스트를 ,로 분리시키고 앞뒤 공백을 지운 후 중복되는 값은 제거 합니다.
      tags:
        tags === "" ? [] : [...new Set(tags.split(",").map(tag => tag.trim()))]
    };
    try {
      // id가 존재하면 editPost 호출
      const { id } = queryString.parse(location.search);
      if (id) {
        await EditorActions.editPost({ id, ...post });
        history.push(`/post/${id}`);
        return;
      }
      await EditorActions.writePost(post);
      history.push(`/post/${this.props.postId}`);
    } catch (e) {
      console.log(e);
    }
  };
  initialize = async () => {
    const { history, EditorActions, location } = this.props;
    const { id } = queryString.parse(location.search);
    const loggedNickname = storage.get("loggedNickname");

    if (!loggedNickname) {
      history.push("/access"); // 로그인 정보가 없다면 여기서 멈춥니다.
    }

    EditorActions.initialize(); // 에디터를 초기화 합니다.
    EditorActions.setPublisher();

    try {
      if (id) {
        // id가 존재 하면 포스트 불러오기
        await EditorActions.getPost(id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.initialize();
  }
  render() {
    const { handleSubmit } = this;
    const { location } = this.props;
    const { id } = queryString.parse(location.search);

    return (
      <div>
        <Helmet>
          <title>Cloudy - 에디터</title>
        </Helmet>

        <EditorComponentHeader onSubmit={handleSubmit} id={id} />
      </div>
    );
  }
}

export default connect(
  state => ({
    title: state.editor.get("title"),
    body: state.editor.get("body"),
    tags: state.editor.get("tags"),
    postId: state.editor.get("postId"),
    publisher: state.editor.get("publisher"),
    isPublisher: state.common.get("isPublisher")
  }),
  dispatch => ({
    EditorActions: bindActionCreators(editorActions, dispatch),
    CommonActions: bindActionCreators(commonActions, dispatch)
  })
)(withRouter(EditorHeaderContainer));
