import { createAction, handleActions } from "redux-actions";
import { Map, List, fromJS } from "immutable";
import { pender } from "redux-pender";
import * as api from "lib/api";

const GET_CHAT_MESSAGE_LIST = "chat/GET_CHAT_MESSAGE_LIST";
const SEND_CHAT_MESSAGE = "chat/SEND_MESSAGE";
const LISTEN_CHAT_MESSAGE = "chat/LISTEN_CHAT_MESSAGE";
const SET_SOCKET = "chat/SET_SOCKET";
const CHANGE_CHAT_MESSAGE_INPUT = "chat/CHANGE_CHAT_MESSAGE_INPUT";

export const getChatMessageList = createAction(
  GET_CHAT_MESSAGE_LIST,
  api.getChatMessageList
);
export const sendChatMessage = createAction(SEND_CHAT_MESSAGE);
export const setSocket = createAction(SET_SOCKET);
export const listenChatMessage = createAction(LISTEN_CHAT_MESSAGE);
export const changeChatMessageInput = createAction(CHANGE_CHAT_MESSAGE_INPUT);

const initialState = Map({
  socket: "",
  chatId: 0,
  chatMessage: "",
  timestamp: "",
  chatList: List()
});

export default handleActions(
  {
    [SET_SOCKET]: (state, action) => {
      const { socket } = action.payload;
      console.log("aaa" + socket);
      return state.set(socket);
    },
    [SEND_CHAT_MESSAGE]: (state, action) => {
      const { msg, userID } = action.payload;

      const chatmessage = state.get("chatList").concat({ text: msg, userID });

      return state
        .set("chatMessage", "")
        .set("who_send", "")
        .set("chatList", chatmessage);
    },

    [LISTEN_CHAT_MESSAGE]: (state, action) => {
      const { msg, userID } = action.payload;
      const chatmessage = state.get("chatList").concat({ text: msg, userID });

      return state.set("chatList", chatmessage);
    },
    [CHANGE_CHAT_MESSAGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      const currentDate = new Date();
      return state
        .set(name, value)
        .set("timestamp", currentDate)
        .set("who_send", "me");
    },
    ...pender({
      type: GET_CHAT_MESSAGE_LIST,

      onSuccess: (state, action) => {
        const { data: chatMessages } = action.payload;
        console.log(fromJS(chatMessages));
        return state.set("chatList", fromJS(chatMessages));
      }
    })
  },
  initialState
);
