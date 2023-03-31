import { Link, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { ChatIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
	Card,
	CardHeader,
	Image,
	CardFooter,
	CardBody,
	Button,
	Flex,
	Box,
	Heading,
	Text,
	IconButton,
} from "@chakra-ui/react";
import Carousel from "../../components/Carousel";
import { CommentList } from "../commentsSlice/CommentsList";
import { useEffect } from "react";
import { fetchPostsFromCategory } from "../postsSlice/postsSlice";
import { useDispatch } from "react-redux";
import { Post } from "./Post";
import { CommentListNew } from "../commentsSlice/CommentListNew";
import { selectAllCommentsIds } from "../commentsSlice/commentsSlice";

const ExcerptSinglePost = () => {
	// Post selectors and data
	const postId = useLoaderData();
	const post = useSelector((state) => selectPostById(state, postId));
	// Comments selectors
	const commentsIds = useSelector(selectAllCommentsIds)
	// Fetch author for every comment author (and reply also)

	if (!post) {
		return "Esperando a post";
	}

	return (
		<>
			<Post id={postId} verticalWrap={false}/>
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

	if (statusPost === "loading" || statusComments === "loading") {
		return (
			<>
				<div>Hola padre cargando cositas</div>
			</>
		);
	} else if (statusPost === "succeeded" && statusComments === "succeeded") {
		return <ExcerptSinglePost postId={postId} />;
	}
};
