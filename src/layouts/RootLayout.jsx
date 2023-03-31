import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

// components
import { Header } from "../components/Header";
import { CategoriesTab } from "../features/categoriesSlice/CategoriesTab";
import { fetchPostsFromCategory } from "../features/postsSlice/postsSlice";
import { useDispatch } from "react-redux";

export default function RootLayout() {
	const dispatch = useDispatch();
	return (
		<div>
			<Box as='nav' pb={20}>
				<Header />
			</Box>

			<Grid templateColumns='repeat(8, 1fr)' bg='gray.50'>
				{/* sidebar */}
				<GridItem
					as='aside'
					colSpan={{ base: 8, lg: 2, xl: 1 }}
					bg='purple.400'
					minHeight={{ lg: "100vh" }}
					p={{ base: "20px", lg: "30px" }}>
					<Box>
						<CategoriesTab />
					</Box>
				</GridItem>

				{/* main content & navbar */}
				<GridItem
					as='main'
					colSpan={{ base: 8, lg: 6, xl: 3 }}
					colStart={{ base: 1, xl: 4 }}
					p='20px'>
					<Outlet />
				</GridItem>
			</Grid>
		</div>
	);
}
