const { createStore, applyMiddleware } = require("redux");
const loggerMiddleware = require("redux-logger").default;
const thunk = require("redux-thunk").default;
const axios = require("axios");

// initialState
const initialState = {
	posts: [],
	loading: false,
	error: "",
};

// Contant
const FETCH_POST_PENDING = "FETCH_POST_PENDING";
const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
const FETCH_POST_ERROR = "FETCH_POST_ERROR";

// Action
const fetchPostPendingAction = () => {
	return {
		type: FETCH_POST_PENDING,
	};
};

const fetchPostSuccessAction = (posts) => {
	return {
		type: FETCH_POST_SUCCESS,
		payload: posts,
	};
};

const fetchPostErrorAction = (error) => {
	return {
		type: FETCH_POST_ERROR,
		payload: error,
	};
};

// Real Action : Thunk Action Creator ****
const fetchPostAction = () => {
	return async (dispatch) => {
		dispatch(fetchPostPendingAction());
		try {
			// make HTTP Request
			const res = await axios.get(
				"https://jsonplaceholder.typicode.com/posts"
			);
			dispatch(fetchPostSuccessAction(res.data));
		} catch (err) {
			dispatch(fetchPostErrorAction(err.message));
		}
	};
};

// Reducer
const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POST_PENDING:
			return { ...state, loading: true };
		case FETCH_POST_SUCCESS:
			return {
				...state,
				posts: action.payload,
				error: "",
				loading: false,
			};
		case FETCH_POST_ERROR:
			return {
				...state,
				posts: [],
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

const rootMiddleware = applyMiddleware(thunk, loggerMiddleware);
// Store
const store = createStore(postsReducer, rootMiddleware);

store.dispatch(fetchPostAction());
