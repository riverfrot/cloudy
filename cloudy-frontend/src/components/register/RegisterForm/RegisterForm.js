import React, { Component } from "react";
import { Container, Button, Form, Label } from "semantic-ui-react";

class RegisterForm extends Component {
  render() {
    const {
      onChangeInput,
      handleSubmit,
      lengthCheckID,
      lengthCheckPassword,
      lengthCheckPasswordCheck,
      lengthCheckNickname,
      passwordEqual,
      message,
      overlapPoint
    } = this.props;

    const handleChange = e => {
      const { value, name } = e.target;
      onChangeInput({ value, name });
    };

    return (
      <Container text>
        <Form>
          <br />
          <Form.Field>
            <label>아이디</label>
            <input
              name="id"
              placeholder="아이디를 입력하세요."
              onChange={handleChange}
            />
            {overlapPoint === "id" && (
              <Label basic color="red" pointing>
                {message}
              </Label>
            )}
            {lengthCheckID === "null" && (
              <Label basic color="red" pointing>
                4자 이상 입력해주세요.
              </Label>
            )}
          </Form.Field>
          <Form.Field>
            <label>패스워드</label>
            <input
              type="password"
              name="password"
              placeholder="패스워드를 입력하세요."
              onChange={handleChange}
            />
            {lengthCheckPassword === "null" && (
              <Label basic color="red" pointing>
                6자 이상 입력해주세요.
              </Label>
            )}
          </Form.Field>
          <Form.Field>
            <label>패스워드 확인</label>
            <input
              type="password"
              name="passwordCheck"
              placeholder="다시 패스워드를 입력하세요."
              onChange={handleChange}
            />
            {lengthCheckPasswordCheck === "null" && (
              <Label basic color="red" pointing>
                6자 이상 입력해주세요.
              </Label>
            )}
            {passwordEqual === "notEqual" && (
              <Label basic color="red" pointing>
                패스워드가 일치하지 않습니다.
              </Label>
            )}
          </Form.Field>

          <Form.Field>
            <label>닉네임</label>
            <input
              name="nickname"
              placeholder="닉네임을 입력하세요."
              onChange={handleChange}
            />
            {overlapPoint === "nickname" && (
              <Label basic color="red" pointing>
                {message}
              </Label>
            )}
            {lengthCheckNickname === "null" && (
              <Label basic color="red" pointing>
                4자 이상 입력해주세요.
              </Label>
            )}
          </Form.Field>
          <br />
          <Button fluid type="submit" color="green" onClick={handleSubmit}>
            회원가입 신청
          </Button>
        </Form>
      </Container>
    );
  }
}

export default RegisterForm;
