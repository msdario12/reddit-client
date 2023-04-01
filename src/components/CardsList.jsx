import { useDispatch, useSelector } from "react-redux";
import { Post } from "../features/postsSlice/Post";
import { selectAllPostsIds } from "../features/postsSlice/postsSlice";
import { useLoaderData } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { fetchPostsFromCategory } from "../features/postsSlice/postsSlice";
import LazyLoad from "react-lazy-load";
import "./lazyStyle.css";

export const CardsList = () => {
	const dispatch = useDispatch();
	const categoryId = useLoaderData();
	const statusPost = useSelector((state) => state.posts.status);
	const postsIds = useSelector(selectAllPostsIds);

	useEffect(() => {
		if (statusPost === "succeeded") {
			dispatch(fetchPostsFromCategory("r/" + categoryId));
		}
	}, [categoryId, dispatch]);

	return (
		<div>
			{postsIds.map((postId) => (
				<LazyLoad key={postId} offset={100} threshold={0.95}>
					<Post verticalWrap={true} id={postId} />
				</LazyLoad>
			))}
		</div>
	);
};
