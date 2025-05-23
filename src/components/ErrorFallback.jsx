// ErrorFallback.jsx
import React from "react";
import { Box, Button, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

const ErrorFallback = () => {
  return (
    <Box p={6} textAlign="center">
      <VStack spacing={4}>
        <Icon as={WarningTwoIcon} boxSize={10} color="red.500" />
        <Heading size="md">Unexpected Application Error</Heading>
        <Text color="gray.600">"Something went wrong. Please try again."</Text>

        <Button
          bg="brand.100"
          color="#fff"
          colorScheme="orange"
          onClick={window.location.reload}>
          Refresh Page
        </Button>
      </VStack>
    </Box>
  );
};

export default ErrorFallback;
