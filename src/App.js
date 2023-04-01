import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import RootLayout from "./layouts/RootLayout";
import store from "./app/store";
import { fetchCommentsFromPost } from "./features/commentsSlice/commentsSlice";
import { fetchPostsFromCategory } from "./features/postsSlice/postsSlice";

// Lazy import
// const CardsList = lazy(() => import("./components/CardsList"));
// const SinglePost = lazy(() => import("./features/postsSlice/SinglePost"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		// errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				async lazy() {
					let { CardsList } = await import("./components/CardsList");
					return { Component: CardsList };
				},

				loader: () => {
					store.dispatch(fetchPostsFromCategory(`/r/Home`));
					return null;
				},
			},
			{
				path: "r/:categoryId",
				async lazy() {
					let { CardsList } = await import("./components/CardsList");
					return { Component: CardsList };
				},
				loader: ({ params }) => {
					store.dispatch(fetchPostsFromCategory(`/r/${params.categoryId}`));
					return params.categoryId;
				},
			},
			{
				path: "r/:categoryId/comments/:postId/:postTitle",
				async lazy() {
					let { SinglePost } = await import("./features/postsSlice/SinglePost");
					return { Component: SinglePost };
				},
				loader: ({ params }) => {
					store.dispatch(
						fetchCommentsFromPost(
							`/r/${params.categoryId}/comments/${params.postId}/${params.postTitle}`
						)
					);
					store.dispatch(fetchPostsFromCategory(`/r/${params.categoryId}`));
					return params.postId;
				},
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
