import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	fetchCommentsFromPost,
	selectAllComments,
	selectAllCommentsIds,
	selectCommentById,
} from "./commentsSlice";

const SingleComment = ({ commentId }) => {

	const comment = useSelector((state) => selectCommentById(state, commentId));

	return (
			<Card my={3}>
                <CardHeader>
                    <Heading size={'sm'}>by {comment.author}</Heading>
                </CardHeader>
				<CardBody>
					<Text>{comment.body}</Text>
				</CardBody>
			</Card>
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

	if (statusComment === "loading" || statusComment === 'iddle') {
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
	const dispatch = useDispatch()
	const response = await dispatch(fetchCommentsFromPost(id)).unwrap()
	return response.json

}