import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";

// Create thunk for fetch categories (subreddits)
export const fetchCategories = createAsyncThunk(
	"categories/fetchCategories",
	async () => {
		const response = await fetch("https://www.reddit.com/subreddits.json");
		const jsonResponse = await response.json()
		console.log(jsonResponse)
		let arrayResponse = []
		jsonResponse.data.children.forEach(entry => {
			arrayResponse.push({
				id: entry.data.id,
				title: entry.data.title,
				url: entry.data.url
			})
		})
		return arrayResponse
	}
);

// Create entityAdapter to create a normalized state slice
const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState();

const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCategories.fulfilled, categoriesAdapter.setAll);
	},
});

export default categoriesSlice.reducer;
