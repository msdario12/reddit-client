import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { fetchAuthorsFromName } from "../authorsSlice/authorsSlice";

// Fetch post from a determined category
export const fetchCommentsFromPost = createAsyncThunk(
	"comments/fetchCommentsFromPost",
	async (permalink, thunkObj) => {
		const endpoint = `https://www.reddit.com${permalink.slice(0,-1)}.json`;
		const response = await fetch(endpoint);
		const jsonResponse = await response.json();
		console.log('comment', jsonResponse)
		let arrayResponse = [];
		jsonResponse[1].data.children.forEach((entry) => {
			arrayResponse.push({
				id: entry.data.id,
				author: entry.data.author,
				body: entry.data.body,
				body_html: entry.data.body_html,
				created: entry.data.created,
				ups: entry.data.ups,
				data: entry.data ? entry.data : false,
			});
			thunkObj.dispatch(fetchAuthorsFromName(entry.data.author))
		});
		return arrayResponse;
	}
);
// Create entityAdapter
const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState({
	status: "iddle",
	error: null,
	authors: [],
});

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCommentsFromPost.fulfilled, (state, action) => {
				commentsAdapter.setAll(state, action.payload);
				state.authors = action.payload.map(obj => obj.author);
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(fetchCommentsFromPost.pending, (state, action) => {
				state.status = "loading";
				state.error = null;
			});
	},
});

export default commentsSlice.reducer;
export const {
	selectAll: selectAllComments,
	selectIds: selectAllCommentsIds,
	selectById: selectCommentById,
} = commentsAdapter.getSelectors((state) => state.comments);

