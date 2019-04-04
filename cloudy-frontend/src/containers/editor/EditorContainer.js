import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as editorActions from "store/modules/editor";
import EditorComponent from "components/editor/EditorComponent";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

class EditorContainer extends Component {
  handleChangeInput = ({ name, value }) => {
    const { EditorActions } = this.props;
    EditorActions.changeInput({ name, value });

    EditorActions.setPublisher();
  };

  render() {
    const { handleChangeInput } = this;
    const { title, body, tags, location } = this.props;
    const { id } = queryString.parse(location.search);
    console.log("contianer" + body);
    return (
      <EditorComponent
        title={title}
        tags={tags}
        id={id}
        body={body}
        onChangeInput={handleChangeInput}
      />
    );
  }
}

export default connect(
  state => ({
    title: state.editor.get("title"),
    body: state.editor.get("body"),
    tags: state.editor.get("tags")
  }),
  dispatch => ({
    EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(withRouter(EditorContainer));
