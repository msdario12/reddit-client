import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectAuthorById } from "../authorsSlice/authorsSlice";
import { calculateTimeStamp } from "../postsSlice/Post";
import { selectCommentById } from "./commentsSlice";


// import { Comment } from "../../components/Comment";

const Comment = lazy(() => import("../../components/Comment"))

// const RepliesComment = ({ reply }) => {
// 	const dispatch = useDispatch();
// 	// Get status of authors slice
// 	// Get avatar of author of reply
// 	const avatar = useSelector((state) => selectAuthorById(state, reply.author));
// 	// console.log("avatar", avatar);
// 	const renderDate = calculateTimeStamp(reply.created);

// 	if (!avatar) {
// 		return <Text>{reply.body}</Text>;
// 	} else if (avatar) {
// 		return (
// 			<Card my={3} key={reply.id} bg='blackAlpha.100'>
// 				<CardHeader>
// 					<Flex gap={3}>
// 						<Avatar name={reply.author} src={avatar.img} />
// 						<Flex flexDirection={"column"} justifyContent='center'>
// 							<Flex gap={3} alignItems='center'>
// 								<Heading size={"sm"}>by {reply.author}</Heading>
// 								<Text>{renderDate}</Text>
// 							</Flex>
// 							<Box>
// 								{reply.author_flair_text && (
// 									<Tag
// 										size={"md"}
// 										variant='solid'
// 										bg={
// 											reply.author_flair_background_color === "transparent"
// 												? "teal"
// 												: reply.author_flair_background_color
// 										}
// 										mt='5px'>
// 										{reply.author_flair_text}
// 									</Tag>
// 								)}
// 							</Box>
// 						</Flex>
// 					</Flex>
// 				</CardHeader>
// 				<CardBody>
// 					<Text>
// 						<HtmlParser content={reply.body_html} />
// 					</Text>
// 				</CardBody>
// 			</Card>
// 		);
// 	}
// };

const SingleComment = ({ comment, author }) => {
	return (
		<Suspense fallback={<p>Cargando suspense...</p>}>
			<Comment
				commentId={comment.id}
				commentUps={comment.ups}
				author={author}
				created={comment.created}
				author_flair_text={comment.author_flair_text}
				author_flair_background_color={comment.author_flair_background_color}
				body_html={comment.body_html}
				numberReplies={comment.replies.length}>
				{comment.replies.map(
					(reply) =>
						reply.body.length > 2 && (
							<Suspense key={reply.id} fallback={<p>Cargando suspense...</p>}>
								<Comment
									commentId={reply.id}
									commentUps={reply.ups}
									author={reply.author}
									created={reply.created}
									author_flair_text={reply.author_flair_text}
									author_flair_background_color={
										reply.author_flair_background_color
									}
									body_html={reply.body_html}
								/>
							</Suspense>
						)
				)}
			</Comment>
		</Suspense>
	);
};

const CommentLoader = ({ commentId }) => {
	// Get comment from the specific id
	const comment = useSelector((state) => selectCommentById(state, commentId));

	const author = comment.author;

	// Check if the fetch of author data is complete, else return a loading component
	return (
		<Suspense key={commentId} fallback={<p>Cargando suspense...</p>}>
			<SingleComment comment={comment} author={author} />
		</Suspense>
	);
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
