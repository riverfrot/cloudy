import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";
import { pender } from "redux-pender";
import storage from "lib/storage";
import * as api from "lib/api";

// 액션 타입 미리 설정하기
// 에디터 영역에서 어떠한 액션들이 처리될지 미리 타입들을 지정함.
const WRITE_POST = "editor/WRITE_POST";
const GET_POST = "editor/GET_POST";
const CHANGE_INPUT = "editor/CHANGE_INPUT";
const SET_PUBLISHER = "editor/SET_PUBLISHER";
const INITIALIZE = "editor/INITIALIZE";
const EDIT_POST = "editor/EDIT_POST";
const CHANGE_MODAL_OPEN = "editor/CHANGE_MODAL_OPEN";
const CHANGE_MODAL_CLOSE = "editor/CHANGE_MODAL_CLOSE";

// 에디터 관련 액션 생성자 만드는 부분
export const writePost = createAction(WRITE_POST, api.writePost);
export const editPost = createAction(EDIT_POST, api.editPost);
export const getPost = createAction(GET_POST, api.getPost);
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const setPublisher = createAction(SET_PUBLISHER);
export const changeModalOpen = createAction(CHANGE_MODAL_OPEN);
export const changeModalClose = createAction(CHANGE_MODAL_CLOSE);

// 초기 state 스토어에 등록할 에디터 데이터들
const initialState = Map({
  title: "",
  body: "",
  tags: "",
  publisher: "",
  postId: null,
  modalState: false
});

// 리듀서
// 에디터에 관한 액션에 대한 처리를 담당하는 부분
export default handleActions(
  {
    [INITIALIZE]: () => initialState,
    [CHANGE_INPUT]: (state, action) => {
      const { value, name } = action.payload;
      console.log(action.payload);
      return state.set(name, value);
    },
    [CHANGE_MODAL_OPEN]: state => {
      return state.set("modalState", true);
    },

    [CHANGE_MODAL_CLOSE]: state => {
      return state.set("modalState", false);
    },
    [SET_PUBLISHER]: state => {
      const publisher = storage.get("loggedNickname");
      console.log("aaa" + storage.get("loggedNickname"));
      return state.set("publisher", publisher);
    },
    ...pender({
      type: WRITE_POST,
      onSuccess: (state, action) => {
        const { _id } = action.payload.data;
        return state.set("postId", _id);
      }
    }),

    ...pender({
      type: GET_POST,
      onSuccess: (state, action) => {
        const { title, tags, body } = action.payload.data;
        console.log(body);
        return state
          .set("title", title)
          .set("body", body)
          .set("tags", tags.join(",")); //배열 -> ,로 구분된 문자열
      }
    })
  },
  initialState
);
