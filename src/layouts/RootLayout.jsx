import { Box, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

// components
import { Header } from "../components/Header";
import { CategoriesTab } from "../features/categoriesSlice/CategoriesTab";

export default function RootLayout() {
	return (
		<div>
			<Box as='nav' pb={20}>
				<Header />
			</Box>

			<Grid templateColumns='repeat(8, 1fr)'>
				{/* sidebar */}
				<GridItem
					as='aside'
					colSpan={{ base: 8, lg: 2, xl: 2 }}
					minHeight={{ lg: "100vh" }}
					bg={useColorModeValue("gray.300", "black")}
					p={{ base: "20px", lg: "30px" }}>
					<Box
						display={{ base: "none", lg: "block" }}
						position={"sticky"}
						top={20}>
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
