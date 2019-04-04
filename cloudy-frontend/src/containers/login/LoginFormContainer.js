import React, { Component } from "react";
import LoginForm from "components/login/LoginForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "store/modules/login";
import { withRouter } from "react-router-dom";
import storage from "lib/storage";

class LoginFormContainer extends Component {
  componentWillMount() {
    const { LoginActions } = this.props;
    LoginActions.clearStore();
  }
  handleSubmit = async () => {
    const { id, password, LoginActions } = this.props;
    try {
      const result = await LoginActions.userLogin({ id, password });
      window.location.href = "/";
      LoginActions.loginSuccess();
      storage.set("loggedNickname", result.data);
    } catch (e) {
      console.log(e);
      if (e.response.status === 403) {
        const { overlapPoint } = e.response.data;
        const message =
          overlapPoint === "login"
            ? "유저가 존재하지 않거나 비밀번호가 일치하지 않습니다."
            : "";
        return this.setError(overlapPoint, message);
      }
    }
  };

  handleThirdPartyLogin = async ({ id, nickname, accesstoken, logintype }) => {
    const { LoginActions } = this.props;
    try {
      console.log(id, nickname, accesstoken);
      const result = await LoginActions.userThirdLogin({
        id,
        nickname,
        accesstoken,
        logintype
      });
      window.location.href = "/";
      LoginActions.loginSuccess();
      console.log(result.data);
      storage.set("loggedNickname", result.data);
    } catch (e) {
      console.log(e);
      if (e.response.status === 403) {
        const { overlapPoint } = e.response.data;
        const message =
          overlapPoint === "login"
            ? "유저가 존재하지 않거나 비밀번호가 일치하지 않습니다."
            : "";
        return this.setError(overlapPoint, message);
      }
    }
  };

  setError = (overlapPoint, message) => {
    const { LoginActions } = this.props;
    LoginActions.setError({ overlapPoint, message });
    return false;
  };

  onChangeInput = ({ value, name }) => {
    const { LoginActions } = this.props;
    LoginActions.changeInput({ value, name });
  };

  componentDidMount() {
    const { LoginActions } = this.props;
    LoginActions.initialize();
  }

  render() {
    const { handleSubmit, onChangeInput, handleThirdPartyLogin } = this;
    const {
      overlapPoint,
      lengthCheckID,
      lengthCheckPassword,
      message
    } = this.props;
    return (
      <LoginForm
        handleSubmit={handleSubmit}
        onThirdPartyLogin={handleThirdPartyLogin}
        onChangeInput={onChangeInput}
        lengthCheckID={lengthCheckID}
        lengthCheckPassword={lengthCheckPassword}
        message={message}
        overlapPoint={overlapPoint}
      />
    );
  }
}

export default connect(
  state => ({
    id: state.login.get("id"),
    password: state.login.get("password"),
    overlapPoint: state.login.get("overlapPoint"),
    message: state.login.get("message"),
    lengthCheckID: state.login.getIn(["lengthCheck", "id"]),
    lengthCheckPassword: state.login.getIn(["lengthCheck", "password"])
  }),
  dispatch => ({
    LoginActions: bindActionCreators(loginActions, dispatch)
  })
)(withRouter(LoginFormContainer));
