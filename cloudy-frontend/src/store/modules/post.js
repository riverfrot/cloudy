import { createAction, handleActions } from "redux-actions";

import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";

import * as api from "lib/api";

// action Types
const GET_POST = "post/GET_POST";
const REMOVE_POST = "post/REMOVE_POST";
const CHANGE_MODAL_OPEN = "post/CHANGE_MODAL_OPEN";
const CHANGE_MODAL_CLOSE = "post/CHANGE_MODAL_CLOSE";
const INTIALIZE = "post/INTIALIZE";

// action Creators
export const getPost = createAction(GET_POST, api.getPost);
export const removePost = createAction(REMOVE_POST, api.removePost);
export const initialize = createAction(INTIALIZE);
export const changeModalOpen = createAction(CHANGE_MODAL_OPEN);
export const changeModalClose = createAction(CHANGE_MODAL_CLOSE);

// initail state
const initialState = Map({
  post: Map({}),
  modalState: false
});

// reducer
export default handleActions(
  {
    [INTIALIZE]: () => initialState,

    [CHANGE_MODAL_OPEN]: state => {
      return state.set("modalState", true);
    },

    [CHANGE_MODAL_CLOSE]: state => {
      return state.set("modalState", false);
    },

    ...pender({
      type: GET_POST,
      onSuccess: (state, action) => {
        const { data: post } = action.payload;
        return state.set("post", fromJS(post));
      }
    })
  },
  initialState
);
