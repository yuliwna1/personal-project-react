import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { githubInfoReducer } from "./github-info-reducer";

export const store = createStore(
  githubInfoReducer,
  undefined,
  applyMiddleware(reduxThunk)
);
