import {
  Avatar,
  AvatarBadge,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { IoStorefrontOutline } from "react-icons/io5";
import { PiBowlFoodLight } from "react-icons/pi";
import { BsSend } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { useRestaurant } from "../context/restaurant";

export default function SideBar() {
  const { activeRestaurant } = useRestaurant();

  return (
    <Flex
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
          {activeRestaurant?.isOpen && (
            <AvatarBadge boxSize="0.7em" bg="green.500" />
          )}
        </Avatar>
        <Flex w="100%" align="center" gap="0.4rem" justify="center">
          <Heading
            style={{ fontFamily: "Poppins" }}
            fontSize="20px"
            color="#111"
            textTransform="capitalize">
            waka kitchen
          </Heading>
          <IconButton
            icon={<FaChevronDown />}
            fontSize="20px"
            size="xs"
            bg="white"
            color="brand.100"
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
        <Nav icon={<PiBowlFoodLight size={26} />} title="Menus" path="/menus" />
        <Nav icon={<BsSend size={20} />} title="Payouts" path="/payouts" />
        <Nav icon={<FaRegUser size={24} />} title="Profile" path="/profile" />
      </Flex>
    </Flex>
  );
}

function Nav({ icon, title, path }) {
  return (
    <NavLink to={path} className="menu hover:underline hover:decoration-2">
      <div>{icon}</div>
      {title}
    </NavLink>
  );
}
