import {
  Avatar,
  AvatarBadge,
  Button,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { IoStorefrontOutline } from "react-icons/io5";
import { PiBowlFoodLight } from "react-icons/pi";
import { BsSend } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { useRestaurant } from "../context/restaurant";
import SwitchRestaurant from "./SwitchRestaurant";
import { useAuth } from "../context/auth";
import { IoSettingsOutline } from "react-icons/io5";
import { IoAnalyticsOutline } from "react-icons/io5";

export default function SideBar() {
  const { activeRestaurant } = useRestaurant();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Fragment>
      <SwitchRestaurant isOpen={isOpen} onClose={onClose} />
      <Flex
        position="relative"
        bg="white"
        display={{ lg: "flex", base: "none" }}
        w="300px"
        h="100vh"
        boxShadow="lg"
        align="center"
        direction="column">
        <Flex p="1rem" w="100%" align="center" direction="column" gap="1rem">
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
              onClick={onOpen}
            />
          </Flex>
        </Flex>
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
          <Nav icon={<BsSend size={20} />} title="Payouts" path="/payouts" />
          <Nav
            icon={<IoAnalyticsOutline size={20} />}
            title="Analytics"
            path="/analytics"
          />
          <Nav icon={<FaRegUser size={24} />} title="Profile" path="/profile" />
          <Nav
            icon={<IoSettingsOutline size={24} />}
            title="Settings"
            path="/settings"
          />
        </Flex>

        <Box
          borderRadius="0rem"
          position="absolute"
          bottom="16"
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
    </Fragment>
  );
}

export function Nav({ icon, title, path }) {
  return (
    <NavLink to={path} className="menu hover:underline hover:decoration-2">
      <div>{icon}</div>
      {title}
    </NavLink>
  );
}
