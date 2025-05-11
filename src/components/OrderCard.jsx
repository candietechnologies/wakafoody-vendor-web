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
import { useQueryClient } from "@tanstack/react-query";
import { useRestaurant } from "../context/restaurant";
import { useNavigate } from "react-router-dom";
import { usePatch } from "../hooks/usePatch";
import { url } from "../utils/lib";

const statusColor = {
  paid: "orange",
  accepted: "pink",
  declined: "red",
  delivered: "green",
  "ready for pickup": "pink",
  "pickup accepted": "pink",
  "picked up": "pink",
};

const OrderCard = ({ order, w }) => {
  const bg = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue("md", "dark-lg");
  const queryClient = useQueryClient();
  const { activeRestaurant } = useRestaurant();
  const navigate = useNavigate();

  const user = order?.user?.length > 0 ? order?.user[0] : "";
  const restaurantId = activeRestaurant?._id;

  function viewOrder() {
    navigate(`/orders/${order?.orderId}`);
  }

  function handleSuccess() {
    queryClient.invalidateQueries([`orders-${restaurantId}`]);
  }

  const acceptHandler = usePatch({
    url: `${url}/v1/order/${order?.id}/vendor/accept?restaurant=${restaurantId}`,
    queryKey: `orders-${restaurantId}`,
    title: "Order accepted",
    onSuccess: handleSuccess,
  });

  const declineHandler = usePatch({
    url: `${url}/v1/order/${order?.id}/vendor/decline?restaurant=${restaurantId}`,
    queryKey: `orders-${restaurantId}`,
    title: "Order declined",
    onSuccess: handleSuccess,
  });

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
        <Text
          onClick={viewOrder}
          style={{ fontFamily: "Poppins" }}
          fontSize="xl"
          fontWeight="bold">
          Order #{order.orderId}
        </Text>

        <Text
          onClick={viewOrder}
          noOfLines={1}
          textTransform="capitalize"
          style={{ fontFamily: "Poppins" }}>
          <strong>Customer:</strong> {user?.firstName} {user?.lastName}
        </Text>

        <Text
          onClick={viewOrder}
          noOfLines={1}
          textTransform="capitalize"
          style={{ fontFamily: "Poppins" }}>
          <strong>Menu:</strong> {order?.menu?.name}
        </Text>

        <Text
          onClick={viewOrder}
          noOfLines={1}
          style={{ fontFamily: "Poppins" }}>
          <strong>Price:</strong> ₦{amountFormater(order?.price || 0)}
        </Text>

        <Text
          onClick={viewOrder}
          noOfLines={1}
          style={{ fontFamily: "Poppins" }}>
          <strong>Quantity:</strong> {order?.quantity}
        </Text>
        <Text
          onClick={viewOrder}
          noOfLines={1}
          style={{ fontFamily: "Poppins" }}>
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
                isLoading={acceptHandler.isPending}
                isDisabled={acceptHandler.isPending}
                onClick={() => {
                  acceptHandler.mutate({});
                }}>
                Accept
              </Button>
              <Button
                style={{ fontFamily: "Poppins" }}
                colorScheme="red"
                size="sm"
                variant="outline"
                isLoading={declineHandler.isPending}
                isDisabled={declineHandler.isPending}
                onClick={() => {
                  declineHandler.mutate({});
                }}>
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
              onClick={viewOrder}>
              View
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default OrderCard;
