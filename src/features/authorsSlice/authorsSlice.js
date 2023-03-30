import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
// https://www.reddit.com/user/salty-sarge-av8r/about.json
// Fetch post from a determined category
export const fetchAuthorsFromName = createAsyncThunk(
	"authors/fetchAuthorsFromName",
	async (name, thunkObj) => {
		const endpoint = `https://www.reddit.com/user/${name}/about.json`;
		const response = await fetch(endpoint);
		const jsonResponse = await response.json();
		console.log('author', jsonResponse)
		let arrayResponse = [];
        const entry = jsonResponse.data;
        const output = {
            id: entry.name,
            id_name: entry.id,
            link_karma: entry.link_karma,
            total_karma: entry.total_karma,
            comment_karma: entry.comment_karma,
            created: entry.created,
            snoovatar_img: entry.snoovatar_img,
        }
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
				authorsAdapter.addOne(state,action.payload);
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

