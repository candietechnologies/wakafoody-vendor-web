import React from "react";
import {
  Box,
  Skeleton,
  SkeletonText,
  VStack,
  HStack,
  useColorModeValue,
  Divider,
  Flex,
} from "@chakra-ui/react";

const OrderSkeleton = ({ w }) => {
  const bg = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue("md", "dark-lg");
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Flex
          align="center"
          justify="space-between"
          flexWrap="wrap"
          key={index}
          w="100%"
          bg={bg}
          shadow={shadow}
          rounded="lg"
          p={5}
          borderLeft="8px solid"
          borderColor="gray.300"
          transition="all 0.3s ease">
          <VStack w={w || "100%"} align="start" spacing={3}>
            <Skeleton height="24px" width="50%" />

            <SkeletonText noOfLines={1} spacing="2" width="80%" />
            <SkeletonText noOfLines={1} spacing="2" width="70%" />
            <SkeletonText noOfLines={1} spacing="2" width="60%" />
            <SkeletonText noOfLines={1} spacing="2" width="40%" />
            <SkeletonText noOfLines={1} spacing="2" width="60%" />

            <Divider my={2} />

            <HStack justify="space-between" w="100%">
              <Skeleton height="24px" width="80px" borderRadius="md" />
              <HStack spacing={3}>
                <Skeleton height="32px" width="70px" borderRadius="md" />
                <Skeleton height="32px" width="70px" borderRadius="md" />
              </HStack>
            </HStack>
          </VStack>
        </Flex>
      ))}
    </>
  );
};

export default OrderSkeleton;
