import React, { Component } from "react";
import { Editor, EditorState } from "draft-js";
import { Container, Header, Form } from "semantic-ui-react";

class EditorComponent extends Component {
  // const postSubmit = () => {
  //   const title = "Matthew";
  //   const body =
  //     "Matthew is a musician living in Nashville.Matthew is a musician living in Nashville.Matthew is a musician living in Nashville.Matthew is a musician living in Nashville.";
  //   const tags = ["더미", "데이터"];
  //   handleSubmit({ title, body, tags });
  // };

  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }

  render() {
    return (
      <Container style={{ marginTop: "7em" }}>
        <Header as="h2" dividing>
          익명 게시글 작성
        </Header>

        <Form>
          <br />
          <Form.Field>
            <label>제목</label>
            <input name="id" placeholder="제목을 입력하세요." />
          </Form.Field>
          <Form.Field>
            <label>태그</label>
            <input
              name="password"
              placeholder="태그를 입력하세요. 쉼표로 구분합니다."
            />
          </Form.Field>
          <Form.Field>
            <label>내용</label>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              // ref={this.setEditor}
              // editorState={this.state.editorState}
              // onChange={this.onChange}
            />
          </Form.Field>
        </Form>
      </Container>
    );
  }
}
export default EditorComponent;
