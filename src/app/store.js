import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categoriesSlice/categoriesSlice.js";
import postsReducer from "../features/postsSlice/postsSlice.js";

export default configureStore({
	reducer: {
		categories: categoriesReducer,
		posts: postsReducer,
	},
});
