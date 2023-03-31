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

export const calculateTimeStamp = (time) => {
	// Define time of post
	const createDatePost = new Date(time * 1000);
	const actualTimestamp = new Date();
	const timestamp = actualTimestamp.getTime() - createDatePost.getTime();

	// Trabajamos con las fechas
	const minutes = Math.round(timestamp / 1000 / 60);
	const hours = Math.round(minutes / 60);
	const days = Math.round(hours / 24);
	// const date = new Date(timestamp).toString();

	if (minutes <= 60) {
		return minutes + " mins ago";
	} else if (hours <= 24) {
		return hours + " hours ago";
	} else {
		return days + " days ago";
	}
};

export const Post = ({ id, verticalWrap }) => {
	const post = useSelector((state) => state.posts.entities[id]);
	const renderDate = calculateTimeStamp(post.created);

	const renderContent = "";
	if (!post.is_reddit_media_domain) {
	}

	const renderTextBody = () => {
		if (verticalWrap) {
			return post.content.substring(0, 340) + "...";
		}
		return post.content;
	};

	return (
		<div>
			<Card maxW='container.lg' my={"2rem"} overflow={"hidden"}>
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
										by {post.author} - {renderDate}
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
					<Link to={post.permalink}>
						{/* Content of post */}
						<Text>{renderTextBody()}</Text>

						{post.is_reddit_media_domain && !post.reddit_video_url && (
							<Image
								objectFit='cover'
								maxWidth='500px'
								width={"100%"}
								mx={"auto"}
								src={post.img}
								alt='Chakra UI'
							/>
						)}
						{!post.is_reddit_media_domain && post.youtube_id_video && (
							<Flex justifyContent={"center"}>
								<iframe
									src={`https://www.youtube-nocookie.com/embed/${post.youtube_id_video}`}
									title='Youtube Video'
									frameborder='0'
									height={"315"}
									width={"560"}
									controls='2'
									loading='lazy'></iframe>
							</Flex>
						)}

						{post.reddit_video_url && (
							<Flex justifyContent={"center"}>
								<iframe
									src={post.reddit_video_url}
									height={post.reddit_height}
									width={post.reddit_width}
									title='Reddit Video'
									loading='lazy'
									frameborder='0'
									autoplay='0'></iframe>
							</Flex>
						)}
					</Link>
					{post.is_gallery && (
						<Carousel maxWidth='500px' mx={"auto"} items={post.gallery_data} />
					)}
				</CardBody>

				<CardFooter
					justify='space-between'
					flexWrap='wrap'
					sx={{
						"& > button": {
							minW: "136px",
						},
					}}>
					<Link to={post.permalink}>
						<Button flex='1' variant='ghost'>
							<ChatIcon me={1} />
							{post.num_comments + " "}
							Comment
						</Button>
					</Link>

					<Button flex='1' variant='ghost'>
						Share
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};
