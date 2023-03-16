import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categoriesSlice/categoriesSlice.js";

export default configureStore({
	reducer: {
		categories: categoriesReducer,
	},
});
