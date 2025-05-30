import {
  Button,
  Divider,
  Flex,
  Heading,
  VStack,
  Box,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import useGet from "../hooks/useGet";
import { url } from "../utils/lib";
import { useQueryClient } from "@tanstack/react-query";
import { useRestaurant } from "../context/restaurant";
import OrderSkeleton from "../pages/orders/OrderSkeleton";
import { useNavigate } from "react-router-dom";

export default function OrdersBar() {
  const [visible, setVisible] = useState(true);
  const queryClient = useQueryClient();
  const { activeRestaurant } = useRestaurant();
  const restaurantId = activeRestaurant?._id;
  const navigate = useNavigate();

  const { data, isPending } = useGet(
    `${url}/v1/restaurant/${restaurantId}/orders?type=newandongoing`,
    `orders-${restaurantId}`
  );

  const list = data?.data;

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [`orders-${restaurantId}`] });
  }, [restaurantId, queryClient]);

  return (
    <Flex
      display={visible ? { lg: "flex", base: "none" } : "none"}
      align="start"
      direction="column"
      w="300px"
      h="100vh"
      bg="white"
      overflowY="scroll"
      boxShadow="lg"
      gap="1rem"
      position="relative"
      p="1rem">
      <Flex w="100%" align="end" justify="end">
        <CloseButton onClick={() => setVisible(false)} colorScheme="red" />
      </Flex>

      <Flex w="100%" align="center" gap="0.4rem" justify="space-between">
        <Heading
          style={{ fontFamily: "Poppins" }}
          fontSize="20px"
          color="#111"
          textTransform="capitalize">
          Ongoing Orders
        </Heading>
        <Button
          style={{ fontFamily: "Poppins" }}
          variant="ghost"
          colorScheme="orange"
          size="sm"
          onClick={() => navigate("/orders")}>
          View All
        </Button>
      </Flex>
      <Divider />
      {isPending && <OrderSkeleton />}

      {list && list?.length > 0 && (
        <VStack spacing={5}>
          {list?.map((order, i) => (
            <OrderCard key={i} order={order} />
          ))}
        </VStack>
      )}

      {list && list?.length === 0 && (
        <Box
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          py={8}
          bg="white"
          px={4}
          textAlign="center"
          color="gray.500"
          width="100%">
          <Text>No orders available.</Text>
        </Box>
      )}
    </Flex>
  );
}
