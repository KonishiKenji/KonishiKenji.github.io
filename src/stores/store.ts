import { applyMiddleware, createStore, compose } from "redux";
import reducer from "./reducer";
import { logger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const isDevelopment = process.env.REACT_APP_ENV !== "production";

const middlewareList = [];
if (isDevelopment) {
  middlewareList.push(logger);
}

const enhancer = isDevelopment
  ? composeWithDevTools(applyMiddleware(...middlewareList))
  : compose(applyMiddleware(...middlewareList));
const store = createStore(reducer, {}, enhancer);

export default store;
