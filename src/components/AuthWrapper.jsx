import React from "react";
import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import ImageComponent from "./Image";

export default function AuthWrapper({
  children,
  text = "Continue the experience by logging in to your account.",
  title = "Welcome Back!",
}) {
  return (
    <Flex
      w="100%"
      align="center"
      justify="center"
      bgGradient="linear(to-r, orange.400, red.500)"
      h="100vh"
      p={4}>
      <Flex
        p={{ lg: "2rem", base: "1rem" }}
        align="center"
        justify="start"
        w="100%"
        maxW="500px"
        bg="white"
        rounded="md"
        boxShadow="xl"
        direction="column"
        gap="1rem">
        <Box w="100px">
          <ImageComponent
            src="/logo.png"
            alt="wakafoody logo"
            fit="cover"
            height="80px"
          />
        </Box>

        <Heading
          fontSize="24px"
          color="#111"
          fontWeight="semibold"
          textAlign="center">
          {title}
        </Heading>

        <Text textAlign="center" fontSize="sm" color="gray.600">
          {text}
        </Text>

        <Divider />

        {children}
      </Flex>
    </Flex>
  );
}
