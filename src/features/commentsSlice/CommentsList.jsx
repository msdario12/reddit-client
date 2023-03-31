import {
	Card,
	CardBody,
	CardHeader,
	Heading,
	Text,
	Flex,
	Grid,
	GridItem,
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
import {
	fetchCommentsFromPost,
	selectAllComments,
	selectAllCommentsIds,
	selectCommentById,
} from "./commentsSlice";
// Determinar cuantas respuestas anidadas existen

export function getNestedReplies(comment) {
	const replies = [comment];
	if (
		comment.data &&
		comment.data.replies &&
		comment.data.replies.data &&
		comment.data.replies.data.children
	) {
		comment.data.replies.data.children.forEach((reply) => {
			const nestedReplies = getNestedReplies(reply);
			if (nestedReplies.length) {
				replies.push(...nestedReplies);
			}
		});
	}
	return replies;
}

export function cleanArray(array) {
	const cleanArray = [];
	array.forEach((reply) => {
		if (reply.data) {
			cleanArray.push({
				body: reply.data.body ? reply.data.body : reply.data.count,
				body_html: reply.data.body_html
					? reply.data.body_html
					: reply.data.count,
				id: reply.data.id ? reply.data.id : false,
				author: reply.data.author ? reply.data.author : false,
				created: reply.data.created ? reply.data.created : false,
				ups: reply.data.ups ? reply.data.ups : false,
				author_flair_text: reply.data.author_flair_text
					? reply.data.author_flair_text
					: false,
				author_flair_background_color: reply.data.author_flair_background_color
					? reply.data.author_flair_background_color
					: "teal",
				author_flair_text_color: reply.data.author_flair_text_color
					? reply.data.author_flair_text_color
					: false,
			});
		}
	});
	cleanArray.shift();
	return cleanArray;
}

const CommentResponses = ({ comment, authorsIds }) => {
	const author = comment.data.author;
	const authorAvatar = useSelector((state) => selectAuthorById(state, author));
	const img =
		authorAvatar && authorAvatar.snoovatar_img
			? authorAvatar.snoovatar_img
			: false;
	if (comment.data.replies) {
		const replies = comment.data.replies.data.children;
		const nestedReplies = getNestedReplies(comment);
		const clean = cleanArray(nestedReplies);
		const numResponses = replies.length;
		// Get avatar for the author of comment

		let render = [];
		let i = 0;
		let count;
		for (const reply of clean) {
			const renderDate = calculateTimeStamp(reply.created);
			i = typeof reply.body === "number" ? i - 1 : i + 1;
			count = i;
			if (reply.id) {
				render.push(
					<GridItem key={reply.created} colStart={i} colEnd={count + 80}>
						<Card key={reply.created} my={2} bg='blackAlpha.300'>
							<CardHeader>
								<Flex gap={2} flexWrap={"wrap"}>
									<Heading size={"sm"}>
										{i}-by {reply.author}
									</Heading>
									<Text> {renderDate}</Text>
								</Flex>
							</CardHeader>
							<CardBody>
								<Text>{reply.body}</Text>
								{img}
							</CardBody>
						</Card>
					</GridItem>
				);
			}
			if (!reply.created) {
				render.push(
					<GridItem key={reply.created} colStart={i} colEnd={count + 20}>
						<Card key={reply.created} my={1} bg='blue.300'>
							<CardBody>
								<Text>Show more {reply.body}</Text>
							</CardBody>
						</Card>
					</GridItem>
				);
			}
		}
		return (
			<Grid
				templateColumns={`repeat(${count + 20}, 1fr)`}
				gap={2}
				width={"100%"}
				key={replies.id}>
				{render}
			</Grid>
		);
	}
};

const SingleComment = ({ commentId }) => {
	const dispatch = useDispatch();
	const comment = useSelector((state) => selectCommentById(state, commentId));
	const renderDate = calculateTimeStamp(comment.created);

	const authorStatus = useSelector((state) => state.authors.status);
	const authorsIds = useSelector(selectAllAuthorsIds);

	useEffect(() => {
		if (authorStatus === "iddle") {
			dispatch(fetchAuthorsFromName(comment.data.author));
		}
	}, [dispatch, authorStatus, comment.data.author]);

	let content;

	if (authorStatus === "loading" && !comment.data) {
		content = "Cargando autor";
	} else if (authorStatus === "succeeded" && comment.data) {
		content = <CommentResponses comment={comment} author={authorsIds} />;
	}

	return (
		<>
			<Card my={3} key={commentId}>
				<CardHeader>
					<Flex gap={3}>
						<Heading size={"sm"}>by {comment.author}</Heading>
						<Text> {renderDate}</Text>
					</Flex>
				</CardHeader>
				<CardBody>
					<Text>{comment.body}</Text>
				</CardBody>
			</Card>

			{content}
		</>
	);
};

const CommentExcerpt = () => {
	const commentsIds = useSelector(selectAllCommentsIds);

	return (
		<>
			{commentsIds.map((commentId) => (
				<SingleComment key={commentId} commentId={commentId} />
			))}
		</>
	);
};

export const CommentList = ({ permalink }) => {
	const statusComment = useSelector((state) => state.comments.status);

	// useEffect(() => {
	// 	if (statusComment === "iddle") {
	// 		dispatch(fetchCommentsFromPost(permalink));
	// 	}
	// }, [permalink]);

	if (statusComment === "loading" || statusComment === "iddle") {
		return "Loading";
	}

	return (
		<div>
			<CommentExcerpt />
		</div>
	);
};

// Fetch comments
export const LoaderComments = async (id) => {
	const dispatch = useDispatch();
	const response = await dispatch(fetchCommentsFromPost(id)).unwrap();
	return response.json;
};
