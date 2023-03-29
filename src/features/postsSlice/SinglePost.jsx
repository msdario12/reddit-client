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

const ExcerptSinglePost = () => {
	const postId = useLoaderData();
	const post = useSelector((state) => selectPostById(state, postId));

	if (!post) {
		return "Esperando a post";
	}

	return (
		<>
			<Post id={postId} />
			<CommentList permalink={post.permalink} />
		</>
	);
};

export const SinglePost = () => {
	const postId = useLoaderData();

	const statusPost = useSelector((state) => state.posts.status);
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
