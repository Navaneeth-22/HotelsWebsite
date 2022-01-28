import { combineReducers, createStore } from "redux";
import { UserReducer } from "./UserReducer";
import { devToolsEnhancer } from "redux-devtools-extension";
import UserSlice from "./UserSlice";
import HotelSlice from "./HotelSlice";

const rootReducer = combineReducers({
  UserReducer: UserReducer,
  UserSlice: UserSlice,
  HotelSlice: HotelSlice,
});
export type AppState = ReturnType<typeof rootReducer>;
export const configureStore = createStore(
  rootReducer,
  {},
  devToolsEnhancer({})
);
