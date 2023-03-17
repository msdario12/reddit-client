import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";

export const fetchPostsFromCategory = createAsyncThunk(
	"posts/fetchPostsFromCategory",
	async (category, thunkObj) => {
		const endpoint = `https://www.reddit.com/${category}.json`;
		const response = await fetch(endpoint);
		const jsonResponse = await response.json();
		let arrayResponse = [];
		console.log('post',jsonResponse);
		jsonResponse.data.children.forEach((entry) => {
			arrayResponse.push({
				id: entry.data.id,
				url: entry.data.subreddit_name_prefixed,
				title: entry.data.title,
				content: entry.data.selftext,
				img: entry.data.url,
				permalink: entry.data.permalink,
			});
		});
		return arrayResponse;
	}
);

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({
	status: "iddle",
	error: null,
});

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPostsFromCategory.fulfilled, (state, action) => {
				postsAdapter.setAll(state, action.payload);
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(fetchPostsFromCategory.pending, (state, action) => {
				state.status = "loading";
				state.error = null;
			});
	},
});

export default postsSlice.reducer;
export const {
	selectAll: selectAllPosts,
	selectIds: selectAllPostsIds,
	selectById: selectPostById,
} = postsAdapter.getSelectors((state) => state.posts);
