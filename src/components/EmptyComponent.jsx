import { Box, Text } from "@chakra-ui/react";

const EmptyComponent = () => {
  return (
    <Box p={6} borderWidth="1px" borderRadius="md" textAlign="center">
      <Text fontSize="lg" color="gray.500">
        Nothing to show here yet.
      </Text>
    </Box>
  );
};

export default EmptyComponent;
