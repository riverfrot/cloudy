import axios from "axios";
import queryString from "query-string";

export const registerUser = ({ id, password, nickname }) =>
  axios.post("/api/auth/register/local", { id, password, nickName: nickname });

export const loginUser = ({ id, password }) =>
  axios.post("/api/auth/login/local", { id, password });

export const thirdLoginUser = ({ id, nickname, accesstoken, logintype }) =>
  axios.post("/api/auth/login/third", {
    id,
    nickName: nickname,
    accesstoken,
    logintype
  });

export const logoutUser = () => axios.post("/api/auth/logout");

export const checkStatus = () => axios.get("/api/auth/check");

export const writePost = ({ title, body, tags, publisher }) =>
  axios.post("/api/posts", { title, body, tags, publisher });

export const editPost = ({ id, title, body, tags }) =>
  axios.patch(`/api/posts/${id}`, { title, body, tags });

export const getPost = id => axios.get(`/api/posts/${id}`);

export const removePost = id => axios.delete(`/api/posts/${id}`);

export const getPostList = ({ tag, page, next }) =>
  axios.get(`/api/posts/?${queryString.stringify({ tag, page, next })}`);

export const getChatRoomList = ({ tag, page, next }) =>
  axios.get(`/api/chatroom/?${queryString.stringify({ tag, page, next })}`);

export const getChatMessageList = ({ roomID }) =>
  axios.get(`/api/chatmessage/?${queryString.stringify({ roomID })}`);

export const registerChatRoom = ({ roomID, title }) =>
  axios.post("/api/chatroom/register", { roomID, title });
