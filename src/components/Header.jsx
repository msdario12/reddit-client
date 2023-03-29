import { Box, Container, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { Search } from "./Search";
export const Header = () => {
	return (
		<Flex
			as={"nav"}
			p='10px'
			alignItems={"center"}
			gap='3'
			bg={"blackAlpha.500"}>
			<Heading as={"h1"} py='2'>
				Redditurre
			</Heading>
			<Spacer />
			<Box bg={"grey.200"} p='10px'>
				M
			</Box>
			<Text>Browse the internet</Text>
		</Flex>

		// <Flex bg={"gray.200"} justify="space-between" wrap={"wrap"} gap="3">
		//     <Box w={"150px"} h="50px" bg={"red"}>1</Box>
		//     <Box w={"150px"} h="50px" bg={"blue"}>2</Box>
		//     <Box w={"150px"} h="50px" bg={"green"} flexGrow="1">3</Box>
		//     <Box w={"150px"} h="50px" bg={"orange"}>4</Box>
		// </Flex>
	);
};
