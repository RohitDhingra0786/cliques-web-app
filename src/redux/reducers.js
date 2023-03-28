/**
 * @file: index.js
 * @description: Application Reducer for rehydrating state to the store and exporting reducers.
 * @date: 11.03.2020
 * @author: Dalbeer Sandhu
 * */

import { combineReducers } from "redux";
import authReducer from "./auth-reducer";

const appReducer = combineReducers({
  auth: authReducer,
});

export default (state, action) => {
  // if (action.type === "auth/selctedPortal") {
  //   state.learning = learningInitialState;
  //   state.channel = channelInitialState;
  // }
  return appReducer(state, action);
};
