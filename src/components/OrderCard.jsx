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
import amountFormater from "../utils/amount-formatter";
import { formatDate } from "../utils/format-date";
import { formatTime } from "../utils/formatTime";

const statusColor = {
  paid: "orange",
  accepted: "pink",
  declined: "red",
  delivered: "green",
  "ready for pickup": "pink",
  "pickup accepted": "pink",
  "picked up": "pink",
};

const OrderCard = ({ order, onAccept, onDecline, w }) => {
  const bg = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue("md", "dark-lg");
  const user = order?.user?.length > 0 ? order?.user[0] : "";
  const menu = order?.menu?.length > 0 ? order?.menu[0] : "";

  return (
    <Box
      w={w || "100%"}
      cursor="pointer"
      bg={bg}
      shadow={shadow}
      rounded="lg"
      p={5}
      borderLeft="8px solid"
      borderColor={`${statusColor[order.status]}.400`}
      transition="all 0.3s ease"
      _hover={{ transform: "scale(1.02)" }}>
      <VStack align="start" spacing={3}>
        <Text style={{ fontFamily: "Poppins" }} fontSize="xl" fontWeight="bold">
          Order #{order.orderId}
        </Text>

        <Text
          noOfLines={1}
          textTransform="capitalize"
          style={{ fontFamily: "Poppins" }}>
          <strong>Customer:</strong> {user?.firstName} {user?.lastName}
        </Text>

        <Text noOfLines={1} style={{ fontFamily: "Poppins" }}>
          <strong>Menu:</strong> {menu?.name}
        </Text>

        <Text noOfLines={1} style={{ fontFamily: "Poppins" }}>
          <strong>Price:</strong> ₦{amountFormater(order?.price || 0)}
        </Text>

        <Text noOfLines={1} style={{ fontFamily: "Poppins" }}>
          <strong>Quantity:</strong> {order?.quantity}
        </Text>
        <Text noOfLines={1} style={{ fontFamily: "Poppins" }}>
          <strong>Date:</strong> {formatDate(order?.date)},{" "}
          {formatTime(order?.date)}
        </Text>
        <Divider my={2} />

        <HStack justify="space-between" w="100%">
          <Badge
            colorScheme={statusColor[order.status]}
            fontSize="12px"
            px={2}
            py="0.3rem"
            style={{ fontFamily: "Poppins" }}
            rounded="md">
            {order.status.toUpperCase()}
          </Badge>

          {order.status === "paid" && (
            <HStack>
              <Button
                size="sm"
                style={{ fontFamily: "Poppins" }}
                colorScheme="green"
                onClick={() => onAccept(order.id)}>
                Accept
              </Button>
              <Button
                style={{ fontFamily: "Poppins" }}
                colorScheme="red"
                size="sm"
                variant="outline"
                onClick={() => onDecline(order.id)}>
                Decline
              </Button>
            </HStack>
          )}
          {order?.status !== "paid" && (
            <Button
              style={{ fontFamily: "Poppins" }}
              colorScheme="orange"
              size="sm"
              bg="brand.100"
              color="#fff"
              onClick={() => onAccept(order.id)}>
              View
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default OrderCard;
