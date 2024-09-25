import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import coffeeReducer from './coffee'
import reviewReducer from "./review";
import favoritesReducer from "./favorites";
import userCoffeeReducer from "./usersCoffee";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  session: sessionReducer,
  coffee: coffeeReducer,
  //!----------Luna-----------
  review: reviewReducer,
  favorite: favoritesReducer,
  userCoffee: userCoffeeReducer,
  cart: cartReducer
  //!----------Luna-----------
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
