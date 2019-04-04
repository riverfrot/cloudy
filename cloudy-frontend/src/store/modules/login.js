import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";
import { pender } from "redux-pender";
import * as api from "lib/api";

// 액션 타입 미리 설정하기
// 로그인 영역에서 어떠한 액션들이 처리될지 미리 타입들을 지정함.
const USER_LOGIN = "login/USER_LOGIN";
const USER_THIRD_LOGIN = "login/USER_THIRD_LOGIN";
const USER_LOGOUT = "login/USER_LOGOUT";
const CHANGE_INPUT = "login/CHANGE_INPUT";
const SET_ERROR = "login/SET_ERROR";
const INITIALIZE = "login/INITIALIZE";
const LOGIN_SUCCESS = "login/LOGIN_SUCCESS";
const CLEAR_STORE = "login/CLEAR_STORE";
const CHECK_STATUS = "login/CHECK_STATUS";

// 로그인 관련 액션 생성자 만드는 부분
export const userLogin = createAction(USER_LOGIN, api.loginUser);
export const userThirdLogin = createAction(
  USER_THIRD_LOGIN,
  api.thirdLoginUser
);
export const userLogout = createAction(USER_LOGOUT, api.logoutUser);
export const checkStatus = createAction(CHECK_STATUS, api.logoutUser);
export const initialize = createAction(INITIALIZE);
export const setError = createAction(SET_ERROR);
export const changeInput = createAction(CHANGE_INPUT);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const clearStore = createAction(CLEAR_STORE);

// 초기 state 스토어에 등록할 로그인 데이터들
const initialState = Map({
  id: "",
  password: "",
  message: "",
  overlapPoint: "",
  lengthCheck: Map({
    id: "id",
    password: "password"
  })
});

// 리듀서
// 로그인에 관한 액션에 대한 처리를 담당하는 부분
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

      return state_status;
    },

    [SET_ERROR]: (state, action) => {
      const { message, overlapPoint } = action.payload;
      return state.set("message", message).set("overlapPoint", overlapPoint);
    },

    [LOGIN_SUCCESS]: state => {
      return state
        .set("message", "")
        .set("overlapPoint", "")
        .set("id", "")
        .set("password", "");
    },

    [CLEAR_STORE]: state => {
      return state
        .set("id", "")
        .set("password", "")
        .set("message", "")
        .set("overlapPoint", "");
    },

    ...pender({
      type: CHECK_STATUS,
      onSuccess: (state, action) => {
        // const { data } = action.payload;

        return;
      },
      onFailure: () => {
        return initialState;
      }
    }),

    ...pender({
      type: USER_LOGOUT,
      onSuccess: state => {
        return state
          .set("message", "")
          .set("overlapPoint", "")
          .set("id", "")
          .set("password", "");
      }
    }),

    ...pender({
      type: USER_LOGIN,
      onSuccess: (state, action) => {
        const { data: id } = action.payload;
        const { data: password } = action.payload;
        return state.set(id).set(password);
      }
    }),
    ...pender({
      type: USER_THIRD_LOGIN,
      onSuccess: (state, action) => {
        const { data: id } = action.payload;
        const { data: accesstoken } = action.payload;
        const { data: nickName } = action.payload;

        return state.set(id);
      }
    })
  },
  initialState
);
