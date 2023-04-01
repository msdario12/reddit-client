import { Link, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { Post } from "./Post";
import { CommentListNew } from "../commentsSlice/CommentListNew";
import { selectAllCommentsIds } from "../commentsSlice/commentsSlice";

import { ChakraProvider, Box, Text, Image, Flex } from "@chakra-ui/react";
import { Suspense } from "react";

const ExcerptSinglePost = () => {
	// Post selectors and data
	const postId = useLoaderData();
	const post = useSelector((state) => selectPostById(state, postId));
	// Comments selectors
	const commentsIds = useSelector(selectAllCommentsIds);
	// Fetch author for every comment author (and reply also)

	if (!post) {
		return "Esperando a post";
	}

	return (
		<>
			<Post id={postId} verticalWrap={false} />
			{/* <CommentList permalink={post.permalink} /> */}
			<CommentListNew commentsIds={commentsIds} />
		</>
	);
};

export const SinglePost = () => {
	// Post things
	const postId = useLoaderData();
	const statusPost = useSelector((state) => state.posts.status);
	// Comments things
	const statusComments = useSelector((state) => state.comments.status);

	return (
		<Suspense fallback={<div>Loading cositas...</div>}>
			<ExcerptSinglePost postId={postId} />
		</Suspense>
	);
};
