const { createStore, applyMiddleware } = require("redux");
const loggerMiddleware = require("redux-logger").default;

// initialState
const initialState = {
	posts: [],
};

// Action
const FETCH_POST_PENDING = "FETCH_POST_PENDING";
const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
const FETCH_POST_ERROR = "FETCH_POST_ERROR";

const fetchPostPending = () => {
	return {
		type: FETCH_POST_PENDING,
	};
};

// Reducer
const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POST_PENDING:
			return { posts: ["HTML"] };
		default:
			return state;
	}
};

// custom-middle
const myMiddleware = () => {
	return (next) => {
		return (action) => {
			console.log("action ===>", action);
			next(action); // forward to middleware or reducer
		};
	};
};

const rootMiddleware = applyMiddleware(loggerMiddleware, myMiddleware);
// Store
const store = createStore(postsReducer, rootMiddleware);

// store.subscribe(() => {
// 	const data = store.getState();
// 	console.log(data);
// });

store.dispatch(fetchPostPending());
