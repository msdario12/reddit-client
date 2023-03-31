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
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
} from "@chakra-ui/react";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { HtmlParser } from "../../components/HtmlParse";
import { UpsCounter } from "../../components/UpsCounter";
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
			<Card my={3} key={reply.id} bg='blackAlpha.100'>
				<CardHeader>
					<Flex gap={3}>
						<Avatar name={reply.author} src={avatar.img} />
						<Heading size={"sm"}>by {reply.author}</Heading>
						<Text> {renderDate}</Text>
					</Flex>
				</CardHeader>
				<CardBody>
					<Text>
						<HtmlParser content={reply.body_html} />
					</Text>
				</CardBody>
			</Card>
		);
	}
};

const SingleComment = ({ comment, author }) => {
	const authorData = useSelector((state) => selectAuthorById(state, author));
	const avatar = authorData && authorData.img ? authorData.img : "none";
	// Calculate timestamp of comment
	const renderDate = calculateTimeStamp(comment.created);
	// Get number of replies of each comment
	const numberReplies = comment.replies.length;

	return (
		<div>
			<Accordion defaultIndex={[1]} allowMultiple>
				<AccordionItem>
					<Card my={3} key={comment.id}>
						<CardHeader>
							<Flex gap={3}>
								<UpsCounter ups={comment.ups} />
								<Avatar name={author} src={avatar} />
								<Heading size={"sm"}>by {comment.author}</Heading>
								<Text> {renderDate}</Text>
							</Flex>
						</CardHeader>
						<CardBody>
							<Text>
								<HtmlParser content={comment.body_html} />
							</Text>
						</CardBody>
						<h2>
							{numberReplies > 0 ? (
								<AccordionButton>
									<Box as='span' flex='1' textAlign='left'>
										{numberReplies + " Replies"}
									</Box>
									<AccordionIcon />
								</AccordionButton>
							) : (
								<></>
							)}
						</h2>
					</Card>

					<AccordionPanel pb={4}>
						{comment.replies.map(
							(reply) =>
								reply.body.length > 2 && (
									<RepliesComment key={reply.id} reply={reply} />
								)
						)}
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
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
