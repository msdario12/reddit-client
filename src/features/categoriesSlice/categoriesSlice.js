import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { fetchPostsFromCategory } from "../postsSlice/postsSlice";

// Create thunk for fetch categories (subreddits)
export const fetchCategories = createAsyncThunk(
	"categories/fetchCategories",
	async () => {
		const response = await fetch("https://www.reddit.com/subreddits.json");
		const jsonResponse = await response.json();
		let arrayResponse = [];
		console.log(jsonResponse)
		jsonResponse.data.children.forEach((entry) => {
			arrayResponse.push({
				id: entry.data.url.substring(1,entry.data.url.length - 1),
				title: entry.data.title,
				url: entry.data.url,
			});
		});
		return arrayResponse;
	}
);

export const fetchCategoryUrl = createAsyncThunk(
	"categories/fetchCategoryUrl",
	async (categoryId, {getState, dispatch}) => {
		// const categoryUrl = await getState().categories.entities[categoryId].url
		dispatch(fetchPostsFromCategory(categoryId))
		return {
			url: categoryId,
		}
	}
)

export const fetchPostsIds = createAsyncThunk(
	"categories/fetchPostsIds",
	async ({getState, dispatch}) => {
		const postsIds = await getState().posts.ids
		return {
			postsIds: postsIds,
		}
	}
)

// Create entityAdapter to create a normalized state slice
const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState({
	status: 'idle',
	error: null,
	urlToRender: '/r/Home/',
	postsIds: [],
});

const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.error = null
				categoriesAdapter.setAll(state, action.payload)
			})
			.addCase(fetchCategories.pending, (state, action) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchCategoryUrl.fulfilled, (state, action) => {
				state.urlToRender = action.payload.url
			})
			.addCase(fetchPostsIds.fulfilled, (state, action) => {
				state.postsIds = action.payload.postsIds
			})
	},
});

export default categoriesSlice.reducer;

export const {
	selectAll: selectAllCategories,
	selectIds: selectAllCategoriesIds,
	selectById: selectCategoryById,
} = categoriesAdapter.getSelectors((state) => state.categories);
