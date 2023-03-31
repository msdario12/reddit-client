import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Text, Flex } from '@chakra-ui/react';

export const UpsCounter = ({ ups }) => {
	return (
		<Flex
			flexDirection={"column"}
			alignContent='center'
			justifyContent={"center"}
			gap='1'>
			<TriangleUpIcon />
			<Text textAlign={"center"}>{ups}</Text>
			<TriangleDownIcon />
		</Flex>
	);
};
