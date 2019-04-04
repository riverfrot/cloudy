import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";
import { pender } from "redux-pender";
import * as api from "lib/api";

const REGISTER_CHATROOM = "chatroom/REGISTER_CHATROOM";
const CHANGE_INPUT = "chatroom/CHANGE_INPUT";
const CHANGE_MODAL_OPEN = "chatroom/CHANGE_MODAL_OPEN";
const CHANGE_MODAL_CLOSE = "chatroom/CHANGE_MODAL_CLOSE";

// 액션 생성자
// 유저 회원가입할때 사용하는것
export const chatroomRegister = createAction(
  REGISTER_CHATROOM,
  api.registerChatRoom
);
export const changeInput = createAction(CHANGE_INPUT);
export const changeModalOpen = createAction(CHANGE_MODAL_OPEN);
export const changeModalClose = createAction(CHANGE_MODAL_CLOSE);

// 초기 state
const initialState = Map({
  roomID: "0",
  title: "",
  createDate: "",
  modalState: false
});

// 리듀서 여기서 모든상태 변화가 일어남.
export default handleActions(
  {
    // [INTIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
      const { value, name } = action.payload;
      // const currentDate = new Date();
      return state.set(name, value);
    },

    [CHANGE_MODAL_OPEN]: state => {
      return state.set("modalState", true);
    },

    [CHANGE_MODAL_CLOSE]: state => {
      return state.set("modalState", false);
    },

    ...pender({
      type: REGISTER_CHATROOM,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        const { data: title } = action.payload;
        return state.set("roomID", _id).set(title);
      }
    })
  },
  initialState
);
