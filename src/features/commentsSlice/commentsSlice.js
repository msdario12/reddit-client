import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { fetchAuthorsFromName } from "../authorsSlice/authorsSlice";
import { cleanArray, getNestedReplies } from "./CommentsList";

// Fetch post from a determined category
export const fetchCommentsFromPost = createAsyncThunk(
	"comments/fetchCommentsFromPost",
	async (permalink, thunkObj) => {
		const endpoint = `https://www.reddit.com${permalink.slice(0, -1)}.json`;
		const response = await fetch(endpoint);
		const jsonResponse = await response.json();
		let arrayResponse = [];
		let arrayAuthors = [];
		let arrayClean = [];
		jsonResponse[1].data.children.forEach((entry) => {
			const obj = {
				id: entry.data.id,
				author: entry.data.author,
				body: entry.data.body,
				body_html: entry.data.body_html,
				created: entry.data.created,
				ups: entry.data.ups,
				// data is parent of replies, is called this way for recursive iteration.
				data: entry.data ? entry.data : false,
				author_flair_text: entry.data.author_flair_text
					? entry.data.author_flair_text
					: false,
				author_flair_background_color: entry.data.author_flair_background_color
					? entry.data.author_flair_background_color
					: false,
				author_flair_text_color: entry.data.author_flair_text_color
					? entry.data.author_flair_text_color
					: false,
			};
			// Get replies inside of obj comment
			const replies = getNestedReplies(obj);
			// Clean array
			const cleanReplies = cleanArray(replies);
			// Push every author of reply array of that comment to a array
			cleanReplies.map((reply) => {
				if (reply.author) {
					arrayClean.push(reply.author);
				}
			});
			// Push author of comments (no replies) to a external array
			arrayAuthors.push(obj.author);
			// Added a key of replies contain a array of replies
			arrayResponse.push({ ...obj, replies: cleanReplies });
		});
		// Concat array of authors of comments and replies of that comment
		const arrayFullAuthors = [...arrayAuthors, ...arrayClean];
		// Eliminate duplicated values using set
		const uniqueAuthors = [...new Set(arrayFullAuthors)];
		// Dispatch a fetch based in a array compose with comments and replies authors
		thunkObj.dispatch(fetchAuthorsFromName(uniqueAuthors));

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
				state.authors = action.payload.map((obj) => obj.author);
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
