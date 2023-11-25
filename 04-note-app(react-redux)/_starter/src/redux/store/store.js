import { createStore, applyMiddleware } from "redux";
import noteReducer from "../reducers/noteReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(
	noteReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
