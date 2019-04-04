import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";
import storage from "lib/storage";

// action Types
const INTIALIZE = "common/INTIALIZE";
const CHECK_PUBLISHER = "common/CHECK_PUBLISHER";

// action Creators
export const initialize = createAction(INTIALIZE);
export const checkPublisher = createAction(CHECK_PUBLISHER);

// initail state
const initialState = Map({
  isPublisher: false
});

// reducer
export default handleActions(
  {
    [INTIALIZE]: () => initialState,
    [CHECK_PUBLISHER]: (state, action) => {
      const { publisher, body } = action.payload;

      const loggedNickname = storage.get("loggedNickname"); // 로그인 정보를 로컬스토리지에서 가져옵니다.
      storage.set("temp_body", body);

      let isPublisher = false;
      publisher === loggedNickname
        ? (isPublisher = true)
        : (isPublisher = false);
      return state.set("isPublisher", isPublisher);
    }
  },
  initialState
);
