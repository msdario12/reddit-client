import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";

export const fetchPostsFromCategory = createAsyncThunk(
	"posts/fetchPostsFromCategory",
	async (category, thunkObj) => {
		const endpoint = `https://www.reddit.com${category}.json`;
		const response = await fetch(endpoint);
		const jsonResponse = await response.json();
		let arrayResponse = [];
		console.log(jsonResponse);
		jsonResponse.data.children.forEach((entry) => {
			arrayResponse.push({
				id: entry.data.id,
				title: entry.data.title,
				content: entry.data.selftext,
			});
		});
		return arrayResponse;
	}
);

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState();

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPostsFromCategory.fulfilled, postsAdapter.setAll);
	},
});

export default postsSlice.reducer;
