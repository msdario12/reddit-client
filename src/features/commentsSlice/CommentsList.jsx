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
import { calculateTimeStamp } from "../postsSlice/Post";
import {
	fetchCommentsFromPost,
	selectAllComments,
	selectAllCommentsIds,
	selectCommentById,
} from "./commentsSlice";

const CommentResponses = ({ comment }) => {

	if (comment.replies.data) {
		const replies = comment.replies.data.children;
		const numResponses = replies.length;
		let render = [];
		let i = 0
		for (const reply of replies) {
			const renderDate = calculateTimeStamp(reply.data.created);
			i = i+1
			render.push(
				<GridItem colStart={i+1} colEnd={numResponses+5}>
					<Card my={2} bg='blackAlpha.300'>
						<CardHeader>
							<Flex gap={2} flexWrap={'wrap'}>
								<Heading size={"sm"}>{i}-by {reply.data.author}</Heading>
								<Text> {renderDate}</Text>
							</Flex>
						</CardHeader>
						<CardBody>
							<Text>{reply.data.body}</Text>
						</CardBody>
					</Card>
				</GridItem>
			);
		}
		return (<Grid templateColumns={`repeat(${numResponses+4}, 0.5fr)`} gap={2} width={'100%'}>
		{render}
		</Grid>);
	}
};

const SingleComment = ({ commentId }) => {
	const comment = useSelector((state) => selectCommentById(state, commentId));
	const renderDate = calculateTimeStamp(comment.created);
	return (
		<>
			<Card my={3}>
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


			{comment.replies && <CommentResponses comment={comment} />}

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
