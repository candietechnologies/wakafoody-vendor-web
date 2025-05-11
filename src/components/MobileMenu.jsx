import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Flex,
  Box,
  Avatar,
  AvatarBadge,
  Heading,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { useRestaurant } from "../context/restaurant";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { FaHome } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { IoStorefrontOutline } from "react-icons/io5";
import { PiBowlFoodLight } from "react-icons/pi";
import { BsSend } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { Nav } from "./SideBar";

const MobileMenu = ({ isOpen, onClose, onOpen }) => {
  const { activeRestaurant } = useRestaurant();
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex
              p="1rem"
              w="100%"
              align="center"
              direction="column"
              gap="1rem">
              <Avatar
                title={activeRestaurant?.name}
                src={activeRestaurant?.image}
                size="xl">
                <AvatarBadge
                  boxSize="0.7em"
                  bg={activeRestaurant?.isOpen ? "green.500" : "gray.500"}
                />
              </Avatar>
              <Flex w="100%" align="center" gap="0.4rem" justify="center">
                <Heading
                  style={{ fontFamily: "Poppins" }}
                  fontSize="18px"
                  fontWeight="600"
                  color="#111"
                  textTransform="capitalize">
                  {activeRestaurant?.name}
                </Heading>
                <IconButton
                  icon={<FaChevronDown />}
                  fontSize="18px"
                  size="xs"
                  bg="white"
                  color="brand.100"
                  onClick={() => {
                    onClose();
                    onOpen();
                  }}
                />
              </Flex>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <Flex
              position="relative"
              bg="white"
              w="100%"
              h="100%"
              align="center"
              direction="column">
              <Flex mt="2.5rem" w="100%" align="start" direction="column">
                <Nav icon={<FaHome size={24} />} title="Home" path="/" />
                <Nav
                  icon={<IoStorefrontOutline size={24} />}
                  title="Orders"
                  path="/orders"
                />
                <Nav
                  icon={<PiBowlFoodLight size={26} />}
                  title="Menus"
                  path="/menus"
                />
                <Nav
                  icon={<BsSend size={20} />}
                  title="Payouts"
                  path="/payouts"
                />
                <Nav
                  icon={<FaRegUser size={24} />}
                  title="Profile"
                  path="/profile"
                />
              </Flex>

              <Box
                borderRadius="0rem"
                position="absolute"
                bottom="0"
                w="100%"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                px="1rem">
                <Button variant="ghost" colorScheme="orange" w="100%">
                  Log Out
                </Button>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenu;
