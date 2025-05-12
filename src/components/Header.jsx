import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import ImageComponent from "./Image";
import { FaAngleDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import MobileMenu from "./MobileMenu";
import SwitchRestaurant from "./SwitchRestaurant";
import { useAuth } from "../context/auth";
import { useRestaurant } from "../context/restaurant";

export default function Header() {
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const switchProps = useDisclosure();
  const { activeRestaurant } = useRestaurant();
  const { logout } = useAuth();

  return (
    <Fragment>
      <MobileMenu
        isOpen={isOpen}
        onClose={onClose}
        onOpen={switchProps.onOpen}
      />
      <SwitchRestaurant
        isOpen={switchProps.isOpen}
        onClose={switchProps.onClose}
      />
      <Flex
        align="center"
        justify="space-between"
        bg="white"
        w="100%"
        h="60px"
        boxShadow="md"
        mb="0rem">
        <Flex pl="1rem" align="center" gap="1rem">
          <Button
            display={{ lg: "none", base: "block" }}
            onClick={onOpen}
            size="sm">
            <AiOutlineMenu size="16px" />
          </Button>
          <Box display={{ lg: "block", base: "none" }} w="100px">
            <ImageComponent
              src="/logo.png"
              alt="wakafoody logo"
              height="50px"
            />
          </Box>
        </Flex>

        <Flex align="center" gap="0.3rem" p="1rem">
          <Avatar
            src={activeRestaurant?.image}
            title={activeRestaurant?.name}
            size="sm"
          />
          <Menu>
            <MenuButton
              bg="white"
              size="sm"
              as={Button}
              textTransform="capitalize"
              rightIcon={<FaAngleDown />}>
              {activeRestaurant?.name}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  navigate("/orders");
                }}>
                Orders
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/menus");
                }}>
                Menus
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/payouts");
                }}>
                Payout
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/profile");
                }}>
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/settings");
                }}>
                Settings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                color="red">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Fragment>
  );
}
