import { useDispatch, useSelector } from "react-redux";
import { Post } from "../features/postsSlice/Post";
import { selectAllPostsIds } from "../features/postsSlice/postsSlice";
import { useLoaderData } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { fetchPostsFromCategory } from "../features/postsSlice/postsSlice";

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

	console.log('fromCardList', categoryId)

	if (statusPost === "loading") {
		return "Loading";
	}

	return (
		<div>
			{postsIds.map((postId) => (
				<Suspense key={postId} fallback={'Loading suspense posts...'}>
				<Post verticalWrap={true}  id={postId} />
				</Suspense>
			))}
		</div>
	);
};
