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
import PayoutInfo from "./PayoutInfo";
import Operation from "./Operations";

export default function Settings() {
  return (
    <Wrapper>
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
              Operations
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
              Payout
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <Operation />
            </TabPanel>

            <TabPanel p={0}>
              <PayoutInfo />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Wrapper>
  );
}
