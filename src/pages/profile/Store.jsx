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

const StoreProfile = () => {
  const { activeRestaurant } = useRestaurant();
  const {
    image,
    name,
    description,
    phone,
    email,
    address,
    status,
    createdAt,
    username,
  } = activeRestaurant;

  const statusColor = status === "active" ? "green" : "red";

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
        <Avatar size="xl" src={image} name={name} />
        <VStack align="start" spacing={1}>
          <Text
            style={{ fontFamily: "Poppins" }}
            textTransform="capitalize"
            fontSize="2xl"
            fontWeight="bold">
            {name}
          </Text>
          <Text textTransform="capitalize" color="gray.500">
            {description}
          </Text>
          <Badge colorScheme={statusColor.toLowerCase()}>{status}</Badge>
        </VStack>
      </Stack>

      <Divider my={4} />

      <VStack align="start" spacing={2}>
        <Info label="Phone" value={phone} />
        <Info label="Email" value={email} />
        <Info label="Address" value={address} />
        <Info
          label="Created"
          value={new Date(createdAt).toLocaleDateString()}
        />
        <Info label="Username" value={username} />
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
