import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./app/store";
import { ChakraProvider } from "@chakra-ui/react";
import { fetchCategories } from "./features/categoriesSlice/categoriesSlice";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import { Post } from "./features/postsSlice/Post";
import { CardsList } from "./components/CardsList";

store.dispatch(fetchCategories());

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		// errorElement: <ErrorPage />,
    children: [
      {
        path: "r/:categoryId",
        element: <CardsList />,
		loader: ({params}) => {
			return params.categoryId
		}
      },
    ]
	},
  
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
