import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
// https://www.reddit.com/user/salty-sarge-av8r/about.json
// Parse img
const parseImg = (img) => {
	if (!img) {
		return;
	}
	if (img.slice(-4).includes("png")) {
		return img;
	} else {
		const index = img.indexOf("jpg");
		return img.slice(0, index + 4);
	}
};
// Fetch post from a determined category
export const fetchAuthorsFromName = createAsyncThunk(
	"authors/fetchAuthorsFromName",
	async (array, thunkObj) => {
		const output = [];
		let endpoints = [];
		array.map((author) => {
			const endpoint = `https://www.reddit.com/user/${author}/about.json`;
			endpoints.push(endpoint);
		});

		const promises = endpoints.map(async (endpoint) => {
			const response = await fetch(endpoint);
			const data = await response.json();
			return { endpoint, data };
		});

		const results = await Promise.allSettled(promises);

		const successfulResults = results
			.filter((result) => result.status === "fulfilled")
			.map((result) => result.value);

		// return successfulResults;
		
		successfulResults.map((obj) =>{
			if (obj.data.data) {
				output.push({
					id: obj.data.data.name,
					id_name: obj.data.data.id,
					link_karma: obj.data.data.link_karma,
					total_karma: obj.data.data.total_karma,
					comment_karma: obj.data.data.comment_karma,
					created: obj.data.data.created,
					img: obj.data.data.snoovatar_img
						? obj.data.data.snoovatar_img
						: parseImg(obj.data.data.icon_img),
				})
			}
			}
		);
		return output;
	}
);
// Create entityAdapter
const authorsAdapter = createEntityAdapter();

const initialState = authorsAdapter.getInitialState({
	status: "iddle",
	error: null,
});

const authorsSlice = createSlice({
	name: "authors",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthorsFromName.fulfilled, (state, action) => {
				authorsAdapter.setAll(state, action.payload);
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(fetchAuthorsFromName.pending, (state, action) => {
				state.status = "loading";
				state.error = null;
			});
	},
});

export default authorsSlice.reducer;
export const {
	selectAll: selectAllAuthors,
	selectIds: selectAllAuthorsIds,
	selectById: selectAuthorById,
} = authorsAdapter.getSelectors((state) => state.authors);
