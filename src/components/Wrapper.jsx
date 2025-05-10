import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import OrdersBar from "./OrdersBar";

export default function Wrapper({ children }) {
  return (
    <Box bg="#eee" w="100%">
      <Header />
      <Flex p="1rem" w="100%" align="center" gap="1rem">
        <SideBar />
        <Flex
          flex="1"
          h={{ lg: "100vh", base: "100%" }}
          overflowY="scroll"
          bg="white">
          {children}
        </Flex>
        <OrdersBar />
      </Flex>
    </Box>
  );
}
