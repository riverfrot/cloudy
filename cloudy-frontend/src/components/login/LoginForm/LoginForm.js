import React, { Component } from "react";
import { Container, Button, Icon, Form, Label } from "semantic-ui-react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  render() {
    const {
      onChangeInput,
      handleSubmit,
      lengthCheckID,
      lengthCheckPassword,
      overlapPoint,
      message
    } = this.props;
    const handleChange = e => {
      const { value, name } = e.target;
      onChangeInput({ value, name });
    };

    const responseGoogle = response => {
      const { onThirdPartyLogin } = this.props;

      if (response.w3.Eea !== undefined) {
        const id = response.w3.Eea;
        const nickname = response.w3.ig;
        const accesstoken = response.accessToken;
        const logintype = "google";
        onThirdPartyLogin({ id, nickname, accesstoken, logintype });
      }
    };

    const responseFacebook = response => {
      const { onThirdPartyLogin } = this.props;
      if (response.id !== undefined) {
        const id = response.id;
        const nickname = response.name;
        const accesstoken = response.accessToken;
        const logintype = "facebook";
        onThirdPartyLogin({ id, nickname, accesstoken, logintype });
      }
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

            {lengthCheckID === "null" && (
              <Label basic color="red" pointing>
                4자 이상 입력해주세요.
              </Label>
            )}
          </Form.Field>
          <Form.Field>
            <label>패스워드</label>
            <input
              name="password"
              type="password"
              placeholder="패스워드를 입력하세요."
              onChange={handleChange}
            />
            {overlapPoint === "login" && (
              <Label basic color="red" pointing>
                {message}
              </Label>
            )}

            {lengthCheckPassword === "null" && (
              <Label basic color="red" pointing>
                6자 이상 입력해주세요.
              </Label>
            )}
          </Form.Field>
          <br />
          <Button fluid type="submit" color="green" onClick={handleSubmit}>
            로그인
          </Button>
          <br />
          <Link to="/register">
            <Button fluid type="submit" color="olive">
              회원가입
            </Button>
          </Link>
          
          <br />
          <FacebookLogin
            appId="424023978370550"
            callback={responseFacebook}
            render={renderProps => (
              <Button fluid color="facebook" onClick={renderProps.onClick}>
                <Icon name="facebook" /> 페이스북으로 시작하기
              </Button>
            )}
          />
          <br />
          <GoogleLogin
            clientId="689027723481-spvbhdlk7jp3rh7sgl7bkjftk9e5f01d.apps.googleusercontent.com"
            render={renderProps => (
              <Button fluid color="google plus" onClick={renderProps.onClick}>
                <Icon name="google plus" /> 구글로 시작하기
              </Button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </Form>
      </Container>
    );
  }
}

export default LoginForm;
