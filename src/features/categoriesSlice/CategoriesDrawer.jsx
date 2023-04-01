import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
} from "@chakra-ui/react";
import { React, useState } from "react";
import { CategoriesTab } from "./CategoriesTab";

export const CategoriesDrawer = ({ isOpen, onClose }) => {
	return (
		<>
			<Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
					<DrawerBody>
						<CategoriesTab />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};
