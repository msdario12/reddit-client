import { ChatIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
	Card,
	CardHeader,
	Image,
	CardFooter,
	CardBody,
	Button,
	Flex,
	Avatar,
	Box,
	Heading,
	Text,
	IconButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel";
import { selectAllPostsIds, selectPostById } from "./postsSlice";

export const Post = ({ id }) => {
	const post = useSelector((state) => state.posts.entities[id]);
	const postTimestamp = new Date(post.created * 1000);
	const actualTimestamp = new Date().getTime();
	const timestamp = actualTimestamp - postTimestamp;
	const date = new Date(timestamp).toLocaleTimeString();
	return (
		<div>
			<Card maxW='container.lg' my={"2rem"}>
				<CardHeader>
					<Flex spacing='4'>
						<Flex flex='1' gap='4' flexWrap='wrap' flexDirection={"column"}>
							<Flex gap={4}>
								<Flex
									flexDirection={"column"}
									alignContent='center'
									justifyContent={"center"}
									gap='1'>
									<TriangleUpIcon />
									<Text textAlign={"center"}>{post.ups}</Text>
									<TriangleDownIcon />
								</Flex>
								<Box>
									<Heading size='sm'>
										by {post.author} - {postTimestamp.toLocaleDateString()}
									</Heading>
								</Box>
							</Flex>
							<Link to={post.permalink}>
								<Heading size={"md"}>{post.title}</Heading>
							</Link>
						</Flex>
						<IconButton
							variant='ghost'
							colorScheme='gray'
							aria-label='See menu'
						/>
					</Flex>
				</CardHeader>
				<CardBody>
					<Text></Text>
				</CardBody>
				{post.is_gallery && (
					<Carousel maxWidth='500px' mx={"auto"} items={post.gallery_data} />
				)}
				{post.is_reddit_media_domain && (
					<Image
						objectFit='cover'
						maxWidth='500px'
						width={"100%"}
						mx={"auto"}
						src={post.img}
						alt='Chakra UI'
					/>
				)}

				<CardFooter
					justify='space-between'
					flexWrap='wrap'
					sx={{
						"& > button": {
							minW: "136px",
						},
					}}>
					<Button flex='1' variant='ghost'>
						<ChatIcon me={1}/>
						{post.num_comments + ' '}
						Comment
					</Button>
					<Button flex='1' variant='ghost'>
						Share
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};
