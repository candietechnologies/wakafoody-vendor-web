import React from "react";
import Wrapper from "../../components/Wrapper";
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import User from "./User";
import StoreProfile from "./Store";
import ReviewList from "./Reviews";
import Security from "./Security";

export default function Profile() {
  return (
    <Wrapper showBar={false}>
      <Flex w="100%" align="start" direction="column" gap="1rem">
        <Tabs
          variant="unstyled"
          colorScheme="orange"
          size={{ base: "sm", md: "md" }}
          w="100%">
          <TabList mb="0.5rem">
            <Tab
              _selected={{ bg: "#FF4500", color: "white" }}
              bg="white"
              color="#FF4500"
              borderRadius="5px"
              flex="1"
              py="2"
              fontSize={{ lg: "16px", base: "14px" }}
              fontWeight="medium"
              border="1px solid #FF4500"
              textAlign="center">
              Profile
            </Tab>
            <Tab
              _selected={{ bg: "#FF4500", color: "white" }}
              bg="white"
              color="#FF4500"
              borderRadius="5px"
              flex="1"
              py="2"
              fontSize={{ lg: "16px", base: "14px" }}
              fontWeight="medium"
              border="1px solid #FF4500"
              textAlign="center">
              Store
            </Tab>
            <Tab
              _selected={{ bg: "#FF4500", color: "white" }}
              bg="white"
              color="#FF4500"
              borderRadius="5px"
              flex="1"
              py="2"
              fontSize={{ lg: "16px", base: "14px" }}
              fontWeight="medium"
              border="1px solid #FF4500"
              textAlign="center">
              Reviews
            </Tab>
            <Tab
              _selected={{ bg: "#FF4500", color: "white" }}
              bg="white"
              color="#FF4500"
              borderRadius="5px"
              flex="1"
              py="2"
              fontSize={{ lg: "16px", base: "14px" }}
              fontWeight="medium"
              border="1px solid #FF4500"
              textAlign="center">
              Security
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <User />
            </TabPanel>

            <TabPanel p={0}>
              <StoreProfile />
            </TabPanel>

            <TabPanel p={0}>
              <ReviewList />
            </TabPanel>

            <TabPanel p={0}>
              <Security />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Wrapper>
  );
}
