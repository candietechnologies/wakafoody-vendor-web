import React, { useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Divider,
  Avatar,
  Button,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";
import OrderStepper from "./OrderStepper";
import Wrapper from "../../components/Wrapper";
import { useQueryClient } from "@tanstack/react-query";
import { useRestaurant } from "../../context/restaurant";
import useGet from "../../hooks/useGet";
import { url } from "../../utils/lib";
import { useParams } from "react-router-dom";
import amountFormater from "../../utils/amount-formatter";
import { formatDate } from "../../utils/format-date";
import Spinner from "../../components/Spinner";
import { usePatch } from "../../hooks/usePatch";

const OrderView = () => {
  const queryClient = useQueryClient();
  const { activeRestaurant } = useRestaurant();
  const { id } = useParams();

  const restaurantId = activeRestaurant?._id;

  const { data, isPending } = useGet(
    `${url}/v1/order/${id}/vendor/web?restaurant=${restaurantId}`,
    `orders-${id}`
  );

  const order = data?.data;
  const user = order?.user?.length > 0 ? order?.user[0] : "";
  const address = order?.address?.length > 0 ? order?.address[0] : "";
  const driver = order?.driver?.length > 0 ? order?.driver[0] : "";

  function handleSuccess() {
    queryClient.invalidateQueries([`orders-${id}`]);
  }

  const acceptHandler = usePatch({
    url: `${url}/v1/order/${order?._id}/vendor/accept?restaurant=${restaurantId}`,
    queryKey: `orders-${id}`,
    title: "Order accepted",
    onSuccess: handleSuccess,
  });

  const declineHandler = usePatch({
    url: `${url}/v1/order/${order?._id}/vendor/decline?restaurant=${restaurantId}`,
    queryKey: `orders-${id}`,
    title: "Order declined",
    onSuccess: handleSuccess,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [`orders-${id}`] });
  }, [id, queryClient]);

  if (isPending) return <Spinner />;

  return (
    <Wrapper>
      <Box w="100%" mx="auto" p={{ lg: 4, base: 1 }}>
        <Heading size="md" mb={4}>
          Order ID: {order?.orderId}
        </Heading>

        <OrderStepper order={order} status={order?.status} />

        <Divider my={6} />

        {/* Order Items */}
        <Box w="100%" bg="white" p="1rem" borderRadius="7px" mb={6}>
          <Heading style={{ fontFamily: "Poppins" }} size="sm" mb={2}>
            Ordered Items
          </Heading>
          <VStack align="start" spacing={3}>
            {order?.carts.map((item, index) => (
              <HStack key={index} justify="space-between" w="100%">
                <Flex align="start" direction="column">
                  <Text
                    noOfLines={1}
                    fontSize={{ base: "13px" }}
                    textTransform="capitalize">
                    {item?.menu?.name} x{item?.quantity}
                  </Text>
                  {item?.options?.length > 0 && (
                    <>
                      <Text fontSize="13px" textTransform="capitalize">
                        Menu Options
                      </Text>
                      {item?.options?.map((el, i) => (
                        <Text
                          fontSize={{ base: "13px" }}
                          key={i}
                          textTransform="capitalize">
                          {el?.name} x{el?.quantity} (₦
                          {amountFormater(el?.price || 0)})
                        </Text>
                      ))}
                    </>
                  )}
                </Flex>
                <Text fontWeight="medium">
                  ₦{amountFormater(item.price || 0)}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Customer Info */}
        <Box w="100%" bg="white" p="1rem" borderRadius="7px" mb={6}>
          <Heading style={{ fontFamily: "Poppins" }} size="sm" mb={2}>
            Customer Info
          </Heading>
          <Text style={{ fontFamily: "Poppins" }} textTransform="capitalize">
            <strong>Name:</strong> {user?.firstName} {user?.lastName}
          </Text>
          <Text style={{ fontFamily: "Poppins" }}>
            <strong>Phone:</strong> {user?.phone}
          </Text>
          <Text style={{ fontFamily: "Poppins" }}>
            <strong>Address:</strong> {address.address}
          </Text>
        </Box>

        {/* Driver Info */}
        {driver && (
          <Box w="100%" bg="white" p="1rem" borderRadius="7px" mb={6}>
            <Heading style={{ fontFamily: "Poppins" }} size="sm" mb={2}>
              Driver Info
            </Heading>
            <HStack>
              <Avatar
                name={`${driver?.firstName} ${driver?.lastName}`}
                src={driver.image}
              />
              <Box style={{ fontFamily: "Poppins" }}>
                <Text textTransform="capitalize">
                  {driver?.firstName} {driver?.lastName}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {driver?.phone || "nil"}
                </Text>
              </Box>
            </HStack>
          </Box>
        )}

        {/* Order Details */}
        <Box w="100%" bg="white" p="1rem" borderRadius="7px" mb={6}>
          <Heading style={{ fontFamily: "Poppins" }} size="sm" mb={2}>
            Order Summary
          </Heading>
          <Text>
            <strong>Total:</strong> ₦{amountFormater(order?.price || 0)}
          </Text>

          <Text>
            <strong>Note:</strong> {order?.restaurantNote || "nil"}
          </Text>
        </Box>

        {/* Accept/Decline Buttons */}
        {order?.status === "paid" && (
          <HStack spacing={4} mb={6}>
            <Button
              isLoading={acceptHandler.isPending}
              isDisabled={acceptHandler.isPending}
              colorScheme="green"
              onClick={() => acceptHandler.mutate()}>
              Accept
            </Button>
            <Button
              isLoading={declineHandler.isPending}
              isDisabled={declineHandler.isPending}
              onClick={() => {
                declineHandler.mutate({});
              }}
              colorScheme="red">
              Decline
            </Button>
          </HStack>
        )}

        {/* Review */}
        {order?.review && (
          <Box w="100%" bg="white" p="1rem" borderRadius="7px" mt={6}>
            <Heading size="sm" mb={2}>
              Customer Review
            </Heading>
            <Text fontStyle="italic" color="gray.700">
              "{order?.review.review}"
            </Text>
            <Text fontSize="sm" mt={1} color="gray.500">
              Rating: {order?.review.rating} / 5
            </Text>

            <Text fontSize="sm" mt={1} color="gray.500">
              Date: {formatDate(order?.review.date)}
            </Text>
          </Box>
        )}
      </Box>
    </Wrapper>
  );
};

export default OrderView;
