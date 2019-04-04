import React, { Component } from "react";
import RegisterForm from "components/register/RegisterForm/RegisterForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as registerActions from "store/modules/register";
import { withRouter } from "react-router-dom";

class RegisterFormContainer extends Component {
  handleSubmit = async () => {
    const { id, password, nickname, history, RegisterActions } = this.props;

    try {
      // 회원 등록 하는 부분.
      await RegisterActions.userRegister({
        id,
        password,
        nickname
      });
      history.push("/login");
      RegisterActions.registerSuccess();
    } catch (e) {
      console.log(e);
      if (e.response.status === 409) {
        const { overlapPoint } = e.response.data;
        const message =
          overlapPoint === "id"
            ? "이미 존재하는 아이디입니다."
            : "이미 존재하는 닉네임입니다.";
        return this.setError(overlapPoint, message);
      }
    }
  };

  setError = (overlapPoint, message) => {
    const { RegisterActions } = this.props;
    RegisterActions.setError({ overlapPoint, message });
    return false;
  };

  onChangeInput = ({ value, name }) => {
    const { RegisterActions } = this.props;
    const { handleValidateConfirmPassword } = this;

    RegisterActions.changeInput({ value, name });

    if (name === "passwordCheck") {
      handleValidateConfirmPassword({ value });
    }
  };

  //Map, setIn으로 바꾸는 작업해야 함
  //자세한 사항은 Base.js를 참고하길 바람.

  handleValidateConfirmPassword = ({ value }) => {
    const { RegisterActions, password } = this.props;
    const passwordCheck = value;
    RegisterActions.checkPasswordEqual({ password, passwordCheck });
  };
  componentDidMount() {
    const { RegisterActions } = this.props;

    RegisterActions.initialize();
  }

  render() {
    const { handleSubmit, onChangeInput, handleValidateConfirmPassword } = this;

    const {
      message,
      overlapPoint,
      lengthCheckID,
      lengthCheckPassword,
      lengthCheckPasswordCheck,
      lengthCheckNickname,
      passwordEqual
    } = this.props;
    return (
      <RegisterForm
        handleValidateConfirmPassword={handleValidateConfirmPassword}
        onChangeInput={onChangeInput}
        handleSubmit={handleSubmit}
        message={message}
        overlapPoint={overlapPoint}
        passwordEqual={passwordEqual}
        lengthCheckID={lengthCheckID}
        lengthCheckPassword={lengthCheckPassword}
        lengthCheckPasswordCheck={lengthCheckPasswordCheck}
        lengthCheckNickname={lengthCheckNickname}
      />
    );
  }
}

export default connect(
  state => ({
    id: state.register.get("id"),
    password: state.register.get("password"),
    passwordCheck: state.register.get("passwordCheck"),
    nickname: state.register.get("nickname"),
    message: state.register.get("message"),
    overlapPoint: state.register.get("overlapPoint"),
    passwordEqual: state.register.get("passwordEqual"),
    lengthCheckID: state.register.getIn(["lengthCheck", "id"]),
    lengthCheckPassword: state.register.getIn(["lengthCheck", "password"]),
    lengthCheckPasswordCheck: state.register.getIn([
      "lengthCheck",
      "passwordCheck"
    ]),
    lengthCheckNickname: state.register.getIn(["lengthCheck", "nickname"])
  }),
  dispatch => ({
    RegisterActions: bindActionCreators(registerActions, dispatch)
  })
)(withRouter(RegisterFormContainer));

// export default RegisterFormContainer;
