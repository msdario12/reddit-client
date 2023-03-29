import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CardsList } from './components/CardsList';
import { SinglePost } from './features/postsSlice/SinglePost';
import RootLayout from "./layouts/RootLayout";
import store from "./app/store";
import { fetchCommentsFromPost } from './features/commentsSlice/commentsSlice';
import { useSelector } from 'react-redux';
import { fetchPostsFromCategory } from './features/postsSlice/postsSlice';


const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		// errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <CardsList />,
				loader: () => {
					store.dispatch(fetchPostsFromCategory(`/r/Home`))
					return null
				},

			},
			{
				path: "r/:categoryId",
				element: <CardsList />,
				loader: ({ params }) => {
					store.dispatch(fetchPostsFromCategory(`/r/${params.categoryId}`))
					return params.categoryId;
				},
			},
			{
				path: "r/:categoryId/comments/:postId/:postTitle",
				element: <SinglePost />,
				loader: ({ params }) => {
					store.dispatch(fetchCommentsFromPost(`/r/${params.categoryId}/comments/${params.postId}/${params.postTitle}`))
					store.dispatch(fetchPostsFromCategory(`/r/${params.categoryId}`))
					return params.postId;
				},
			},
		],
	},
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
