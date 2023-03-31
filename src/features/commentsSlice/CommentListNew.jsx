import {
	Card,
	CardBody,
	CardHeader,
	Heading,
	Text,
	Flex,
	Grid,
	GridItem,
	Avatar,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	fetchAuthorsFromName,
	selectAllAuthorsIds,
	selectAuthorById,
} from "../authorsSlice/authorsSlice";
import { calculateTimeStamp } from "../postsSlice/Post";
import { cleanArray, getNestedReplies } from "./CommentsList";
import {
	fetchCommentsFromPost,
	selectAllComments,
	selectAllCommentsIds,
	selectCommentById,
} from "./commentsSlice";

const RepliesComment = ({ reply }) => {
	const dispatch = useDispatch();
	// Get status of authors slice
	// Get avatar of author of reply
	const avatar = useSelector((state) => selectAuthorById(state, reply.author));
	// console.log("avatar", avatar);
	const renderDate = calculateTimeStamp(reply.created);

	if (!avatar) {
		return <Text>{reply.body}</Text>;
	} else if (avatar) {
		return (
			<li>
				<Card my={3} key={reply.id} bg='blackAlpha.300'>
					<CardHeader>
						<Flex gap={3}>
							<Avatar name={reply.author} src={avatar.img} />
							<Heading size={"sm"}>by {reply.author}</Heading>
							<Text> {renderDate}</Text>
						</Flex>
					</CardHeader>
					<CardBody>
						<Text>{reply.body}</Text>
					</CardBody>
				</Card>
			</li>
		);
	}
};

const SingleComment = ({ comment, author }) => {
	const authorData = useSelector((state) => selectAuthorById(state, author));
	const avatar = authorData && authorData.img ? authorData.img : "none";

	const renderDate = calculateTimeStamp(comment.created);

	return (
		<div>
			<Card my={3} key={comment.id}>
				<CardHeader>
					<Flex gap={3}>
						<Avatar name={author} src={avatar} />
						<Heading size={"sm"}>by {comment.author}</Heading>
						<Text> {renderDate}</Text>
					</Flex>
				</CardHeader>
				<CardBody>
					<Text>{comment.body}</Text>
				</CardBody>
			</Card>

			<ul>
				{comment.replies.map(
					(reply) => reply.body.length > 2 && <RepliesComment reply={reply} />
				)}
			</ul>
		</div>
	);
};

const CommentLoader = ({ commentId }) => {
	const dispatch = useDispatch();
	// Get comment from the specific id
	const comment = useSelector((state) => selectCommentById(state, commentId));

	// Get status of authors slice
	const authorsStatus = useSelector((state) => state.authors.status);
	const author = comment.author;
	// Fetch author avatar for that comment, only when "author" change
	// useEffect(() => {
	// 	if (authorsStatus === "iddle" || authorsStatus === "succeeded") {
	// 		dispatch(fetchAuthorsFromName(author));
	// 	}
	// }, [author]);
	// Check if the fetch of author data is complete, else return a loading component
	if (authorsStatus === "loading") {
		// Loading page
		return "Cargando author avatar";
	} else if (authorsStatus === "succeeded") {
		// Return actual component to render
		return <SingleComment comment={comment} author={author} />;
	}
};

export const CommentListNew = ({ commentsIds }) => {
	let content;

	content = commentsIds.map((commentId) => (
		<CommentLoader key={commentId} commentId={commentId} />
	));

	return (
		<div>
			Nuevos comentarios
			{content}
		</div>
	);
};
