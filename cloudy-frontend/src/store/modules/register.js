import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";
import { pender } from "redux-pender";
import * as api from "lib/api";

const USER_REGISTER = "register/USER_REGISTER";
const CHANGE_INPUT = "register/CHANGE_INPUT";
const SET_ERROR = "register/SET_ERROR";
const REGISTER_SUCCESS = "register/REGISTER_SUCCESS";
const INITIALIZE = "register/INITIALIZE";
const CHECK_PASSWORD_EQUAL = "register/CHECK_PASSWORD_EQUAL";
const CHECK_INPUT_LENGTH = "register/CHECK_INPUT_LENGTH";

// 액션 생성자
// 유저 회원가입할때 사용하는것
export const userRegister = createAction(USER_REGISTER, api.registerUser);
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const setError = createAction(SET_ERROR);
export const checkPasswordEqual = createAction(CHECK_PASSWORD_EQUAL);
export const changeInputLength = createAction(CHECK_INPUT_LENGTH);
export const registerSuccess = createAction(REGISTER_SUCCESS);

// 초기 state
const initialState = Map({
  id: "",
  nickname: "",
  password: "",
  passwordCheck: "",
  message: "",
  overlapPoint: "",
  passwordEqual: "null",
  lengthCheck: Map({
    id: "id",
    password: "password",
    passwordCheck: "passwordCheck",
    nickname: "nickname"
  })
});

// 리듀서 여기서 모든상태 변화가 일어남.
export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [CHANGE_INPUT]: (state, action) => {
      const { value, name } = action.payload;

      let state_status;

      if (name === "id") {
        value.length < 4
          ? (state_status = state
              .set(name, value)
              .setIn(["lengthCheck", name], "null"))
          : (state_status = state
              .set(name, value)
              .setIn(["lengthCheck", name], name));
      }
      if (name === "password") {
        value.length < 6
          ? (state_status = state
              .set(name, value)
              .setIn(["lengthCheck", name], "null"))
          : (state_status = state
              .set(name, value)
              .setIn(["lengthCheck", name], name));
      }
      if (name === "passwordCheck") {
        value.length < 6
          ? (state_status = state
              .set(name, value)
              .setIn(["lengthCheck", name], "null"))
          : (state_status = state
              .set(name, value)
              .setIn(["lengthCheck", name], name));
      }
      if (name === "nickname") {
        value.length < 4
          ? (state_status = state
              .set(name, value)
              .setIn(["lengthCheck", name], "null"))
          : (state_status = state
              .set(name, value)
              .setIn(["lengthCheck", name], name));
      }
      return state_status;
    },

    [SET_ERROR]: (state, action) => {
      const { message, overlapPoint } = action.payload;
      return state.set("message", message).set("overlapPoint", overlapPoint);
    },

    [CHECK_PASSWORD_EQUAL]: (state, action) => {
      const { password, passwordCheck } = action.payload;

      let state_status;
      password === passwordCheck
        ? (state_status = state.set("passwordEqual", "equal"))
        : (state_status = state.set("passwordEqual", "notEqual"));

      return state_status;
    },

    [REGISTER_SUCCESS]: state => {
      return state
        .set("message", "")
        .set("overlapPoint", "")
        .set("id", "")
        .set("password", "")
        .set("passwordCheck", "")
        .set("nickName", "");
    },

    ...pender({
      type: USER_REGISTER,
      onSuccess: (state, action) => {
        const { data: id } = action.payload;
        const { data: password } = action.payload;
        const { data: nickname } = action.payload;

        return (
          state
            .set("id", id)
            .set("password", password)
            // .set("Password", PasswordCheck)
            .set("nickname", nickname)
        );
      }
    })
  },
  initialState
);
