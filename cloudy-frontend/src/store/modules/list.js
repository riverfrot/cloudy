import { createAction, handleActions } from "redux-actions";

import { Map, List, fromJS } from "immutable";
import { pender } from "redux-pender";

import * as api from "lib/api";

// action Types
const GET_POST_LIST = "list/GET_POST_LIST";
const GET_CHATROOM_LIST = "list/GET_CHATROOM_LIST";
const SET_LOADING = "list/SET_LOADGIN";
const INIT_LOADING = "list/INIT_LOADING";

// action Creators
export const getPostList = createAction(
  GET_POST_LIST,
  api.getPostList,
  meta => meta
);

export const getCharRoomList = createAction(
  GET_CHATROOM_LIST,
  api.getChatRoomList,
  meta => meta
);

export const setLoading = createAction(SET_LOADING);
export const initLoading = createAction(INIT_LOADING);

// initail state
const initialState = Map({
  posts: List(),
  chatrooms: List(),
  lastPage: null,
  // 아래 추가.
  isLast: false,
  isLoading: false
});

// reducer
export default handleActions(
  {
    [SET_LOADING]: state => {
      return state.set("isLoading", true);
    },
    [INIT_LOADING]: state => {
      return state.set("isLoading", false);
    },
    ...pender({
      type: GET_POST_LIST,
      // onPending: (state, action) => {
      //   return state.set("isLoading", true);
      // },
      onSuccess: (state, action) => {
        const { data: posts } = action.payload;

        // console.log(fromJS(posts));
        const lastPage = action.payload.headers["last-page"];
        const next = parseInt(action.payload.headers["next"], 10);
        const posts_before = state.get("posts");

        const newPost = posts_before.toArray();
        posts.map(post => {
          const mapPost = Map(post);
          newPost.push(mapPost);
          return 0;
        });

        return next === 1
          ? state.set("posts", fromJS(newPost))
          : state
              .set("posts", fromJS(posts))
              //parseInt 앞에는 정수형으로 형변환할 데이터, 뒤에 인자값은 진수를 나타냄
              .set("lastPage", parseInt(lastPage, 10));
      }
    }),

    ...pender({
      type: GET_CHATROOM_LIST,
      // onPending: (state, action) => {
      //   return state.set("isLoading", true);
      // },
      onSuccess: (state, action) => {
        const { data: chatrooms } = action.payload;

        // console.log(fromJS(posts));
        const lastPage = action.payload.headers["last-page"];
        const next = parseInt(action.payload.headers["next"], 10);
        const chatrooms_before = state.get("chatrooms");

        const newChatRoom = chatrooms_before.toArray();
        chatrooms.map(ChatRoom => {
          const mapChatRoom = Map(ChatRoom);
          newChatRoom.push(mapChatRoom);
          return 0;
        });
        return next === 1
          ? state.set("chatrooms", fromJS(newChatRoom))
          : state
              .set("chatrooms", fromJS(chatrooms))
              //parseInt 앞에는 정수형으로 형변환할 데이터, 뒤에 인자값은 진수를 나타냄
              .set("lastPage", parseInt(lastPage, 10));
      }
    })
  },
  initialState
);
