import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categoriesSlice/categoriesSlice.js";
import postsReducer from "../features/postsSlice/postsSlice.js";
import commentsReducer from '../features/commentsSlice/commentsSlice'

export default configureStore({
	reducer: {
		categories: categoriesReducer,
		posts: postsReducer,
		comments: commentsReducer,
	},
});
