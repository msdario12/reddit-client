import {
	Accordion,
	AccordionItem,
	Card,
	Flex,
	Avatar,
	Heading,
	Text,
	Box,
	Tag,
	CardBody,
	CardHeader,
	AccordionPanel,
	AccordionButton,
	AccordionIcon,
} from "@chakra-ui/react";
import { UpsCounter } from "./UpsCounter";
import { HtmlParser } from "./HtmlParse";
import { useSelector } from "react-redux";
import { selectAuthorById } from "../features/authorsSlice/authorsSlice";
import { calculateTimeStamp } from "../features/postsSlice/Post";

const Comment = (props) => {
	const {
		commentId,
		commentUps,
		author,
		created,
		author_flair_text,
		author_flair_background_color,
		body_html,
		numberReplies,
	} = props;

	const authorData = useSelector((state) => selectAuthorById(state, author));
	const avatar = authorData && authorData.img ? authorData.img : "none";
	// Calculate timestamp of comment
	const renderDate = calculateTimeStamp(created);

	return (
		<Accordion defaultIndex={[1]} allowMultiple>
			<AccordionItem>
				<Card my={3} key={commentId}>
					<CardHeader>
						<Flex gap={3}>
							<UpsCounter ups={commentUps} />
							<Avatar name={author} src={avatar} size='xl' />
							<Flex flexDirection={"column"} justifyContent='center'>
								<Flex gap={3} alignItems='center'>
									<Heading size={"sm"}>by {author}</Heading>
									<Text>{renderDate}</Text>
								</Flex>
								<Box>
									{author_flair_text && (
										<Tag
											size={"md"}
											variant='solid'
											bg={
												author_flair_background_color === "transparent"
													? "teal"
													: author_flair_background_color
											}
											mt='5px'>
											{author_flair_text}
										</Tag>
									)}
								</Box>
							</Flex>
						</Flex>
					</CardHeader>
					<CardBody>
						<Text>
							<HtmlParser content={body_html} />
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

				<AccordionPanel pb={4}>{props.children}</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};

export default Comment;
