import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import penderMiddleware from "redux-pender";
import * as modules from "./modules";

const reducers = combineReducers(modules);
const middlewares = [penderMiddleware()];

// 개발 모드 일때만 Redux Devtools를 적용 합니다.
const isDev = process.env.NODE_ENV === "development";
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

//preloadedState는 추후 서버사이드 랜더링을 했을 때 전달받는 초기 상태 입니다.

const configure = preloadState =>
  createStore(
    reducers,
    preloadState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

export default configure;