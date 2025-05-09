import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import ImageComponent from "./Image";
import { FaAngleDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <Flex
      align="center"
      justify="space-between"
      bg="white"
      w="100%"
      h="60px"
      boxShadow="md"
      mb="0rem">
      <Box w="100px">
        <ImageComponent src="/logo.png" alt="wakafoody logo" height="50px" />
      </Box>

      <Flex align="center" gap="0.5rem" p="1rem">
        <Avatar src="" title="mr candie" size="sm" />
        <Menu>
          <MenuButton size="sm" as={Button} rightIcon={<FaAngleDown />}>
            Candie
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={() => navigate("/login")} color="red">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
