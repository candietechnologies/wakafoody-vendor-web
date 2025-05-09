import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";

const statusColor = {
  paid: "orange",
  accepted: "green",
  declined: "red",
  delivered: "blue",
  pending: "gray",
};

const OrderCard = ({ order, onAccept, onDecline }) => {
  const bg = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue("md", "dark-lg");

  return (
    <Box
      w="100%"
      bg={bg}
      shadow={shadow}
      rounded="lg"
      p={5}
      borderLeft="8px solid"
      borderColor={`${statusColor[order.status]}.400`}
      transition="all 0.3s ease"
      _hover={{ transform: "scale(1.02)" }}>
      <VStack align="start" spacing={3}>
        <Text fontSize="xl" fontWeight="bold">
          Order #{order.id}
        </Text>

        <Text>
          <strong>Customer:</strong> {order.customerName}
        </Text>

        <Text>
          <strong>Items:</strong>
        </Text>
        <VStack align="start" spacing={1} pl={2}>
          {order.items.map((item, idx) => (
            <Text key={idx}>• {item}</Text>
          ))}
        </VStack>

        <Divider my={2} />

        <HStack justify="space-between" w="100%">
          <Badge
            colorScheme={statusColor[order.status]}
            fontSize="0.9em"
            px={3}
            py={1}
            rounded="md">
            {order.status.toUpperCase()}
          </Badge>

          {order.status === "paid" && (
            <HStack>
              <Button colorScheme="green" onClick={() => onAccept(order.id)}>
                Accept
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => onDecline(order.id)}>
                Decline
              </Button>
            </HStack>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default OrderCard;
