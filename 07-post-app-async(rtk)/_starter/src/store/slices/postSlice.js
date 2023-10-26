import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../utils/apiURL";

const initialState = {
	postsData: [],
	loading: false,
	error: "",
};

// thunk action creator before => 4 fn มาจาก 3 fn ย่อย
// thunk action create => 1 fn (Redux toolkit + createAsyncThunk)

// AutoGenerate 3 State of Promise
// posts/fetchPosts/pending
// posts/fetchPosts/fulfilled
// posts/fetchPosts/rejected

// fetchPosts ==  Thunk Action Creator = Async Action Creator
export const fetchPostsAction = createAsyncThunk(
	"posts/fetchPosts",
	async (payload, thunkAPI) => {
		try {
			// Make HTTP Request
			const res = await axios.get(apiUrl);
			console.log(res.data);

			return res.data; // return payload
		} catch (err) {
			console.log(err);
			return thunkAPI.rejectWithValue(err.response.status);
		}
	}
);

const postSlice = createSlice({
	name: "postSlice",
	initialState: initialState,
	reducers: {
		// method: SYNC operation
	},

	// Async operation
	extraReducers: (builder) => {
		builder
			.addCase(fetchPostsAction.pending, (state, action) => {
				state.postsData = [];
				state.loading = true;
				state.error = "";
			})
			.addCase(fetchPostsAction.fulfilled, (state, action) => {
				state.postsData = action.payload;
				state.loading = false;
				state.error = "";
			})
			.addCase(fetchPostsAction.rejected, (state, action) => {
				state.postsData = [];
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// gen postReducer
const postReducer = postSlice.reducer;
export default postReducer;
