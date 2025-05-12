import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useRestaurant } from "../../context/restaurant";
import { formatDate } from "../../utils/format-date";
import { formatTime } from "../../utils/formatTime";

const ReviewList = () => {
  const bg = useColorModeValue("white", "gray.700");
  const { activeRestaurant } = useRestaurant();
  const reviews = activeRestaurant?.reviews;

  if (!reviews || reviews.length === 0) {
    return (
      <Center py={10}>
        <Text color="gray.500" fontSize="lg">
          No reviews yet.
        </Text>
      </Center>
    );
  }

  return (
    <VStack align="stretch" spacing={4}>
      {reviews.map((review, index) => (
        <Box
          key={index}
          p={4}
          borderWidth={1}
          borderRadius="md"
          bg={bg}
          boxShadow="sm">
          <HStack align="start" spacing={4}>
            <Avatar name={`${review.user.firstName} ${review.user.lastName}`} />
            <VStack align="start" spacing={1}>
              <HStack spacing={2}>
                <Text textTransform="capitalize" fontWeight="bold">
                  {review.user.firstName} {review.user.lastName}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {formatDate(review.date)}, {formatTime(review.date)}
                </Text>
              </HStack>
              <HStack>{renderStars(review.rating)}</HStack>
              <Text mt={2}>{review.review}</Text>
            </VStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

// Helper to render stars based on rating (0-5)
const renderStars = (rating) => {
  return Array(5)
    .fill("")
    .map((_, i) => (
      <StarIcon
        key={i}
        color={i < rating ? "yellow.400" : "gray.300"}
        boxSize={4}
      />
    ));
};

export default ReviewList;
