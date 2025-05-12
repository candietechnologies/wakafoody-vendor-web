import React from "react";
import {
  Box,
  Avatar,
  Text,
  Stack,
  HStack,
  VStack,
  Badge,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRestaurant } from "../../context/restaurant";
import { formatDate } from "../../utils/format-date";
import { formatTime } from "../../utils/formatTime";

const StoreProfile = () => {
  const { activeRestaurant } = useRestaurant();

  const statusColor = activeRestaurant?.status === "active" ? "green" : "red";

  return (
    <Box
      maxW="600px"
      mx="auto"
      p={6}
      borderWidth={1}
      borderRadius="lg"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="md">
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={6}
        align="center">
        <Avatar
          size="xl"
          src={activeRestaurant?.image}
          name={activeRestaurant?.name}
        />
        <VStack align="start" spacing={1}>
          <Text
            style={{ fontFamily: "Poppins" }}
            textTransform="capitalize"
            fontSize="2xl"
            fontWeight="bold">
            {activeRestaurant?.name}
          </Text>
          <Text textTransform="capitalize" color="gray.500">
            {activeRestaurant?.description}
          </Text>
          <Badge colorScheme={statusColor.toLowerCase()}>
            {activeRestaurant?.status}
          </Badge>
        </VStack>
      </Stack>

      <Divider my={4} />

      <VStack align="start" spacing={2}>
        <Info label="Phone" value={activeRestaurant?.phone} />
        <Info label="Email" value={activeRestaurant?.email} />
        <Info label="Address" value={activeRestaurant?.address} />
        <Info
          label="Created"
          value={`${formatDate(activeRestaurant?.createdAt)},${formatTime(
            activeRestaurant?.createdAt
          )}`}
        />
        <Info label="Username" value={activeRestaurant?.username} />
      </VStack>
    </Box>
  );
};

const Info = ({ label, value }) => (
  <HStack spacing={3}>
    <Text style={{ fontFamily: "Poppins" }} fontWeight="semibold" minW="100px">
      {label}:
    </Text>
    <Text style={{ fontFamily: "Poppins" }} noOfLines={1} color="gray.600">
      {value}
    </Text>
  </HStack>
);

export default StoreProfile;
