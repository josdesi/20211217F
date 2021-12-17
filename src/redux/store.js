import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import sagas from "./sagas";

const store = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(sagas);

  // if (module.hot) {
  //   module.hot.accept("./reducers", () => {
  //     const nextRootReducer = require("./reducers");
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }
  return store;
};

export default store;