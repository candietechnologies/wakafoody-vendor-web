import { Button, Divider, Flex, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import OrderCard from "./OrderCard";

const orders = [
  {
    id: "12345",
    customerName: "Jane Doe",
    items: ["Burger", "Fries", "Soda"],
    status: "paid",
  },
  {
    id: "12346",
    customerName: "John Smith",
    items: ["Pizza", "Garlic Bread"],
    status: "accepted",
  },
  {
    id: "12345",
    customerName: "Jane Doe",
    items: ["Burger", "Fries", "Soda"],
    status: "paid",
  },
  {
    id: "12346",
    customerName: "John Smith",
    items: ["Pizza", "Garlic Bread"],
    status: "accepted",
  },
  {
    id: "12345",
    customerName: "Jane Doe",
    items: ["Burger", "Fries", "Soda"],
    status: "paid",
  },
  {
    id: "12346",
    customerName: "John Smith",
    items: ["Pizza", "Garlic Bread"],
    status: "accepted",
  },
];

export default function OrdersBar() {
  return (
    <Flex
      align="start"
      direction="column"
      w="350px"
      h="100vh"
      bg="white"
      overflowY="scroll"
      boxShadow="lg"
      gap="1rem"
      p="1rem">
      <Flex w="100%" align="center" gap="0.4rem" justify="space-between">
        <Heading
          style={{ fontFamily: "Poppins" }}
          fontSize="20px"
          color="#111"
          textTransform="capitalize">
          Ongoing Orders
        </Heading>
        <Button variant="ghost" colorScheme="orange" size="sm">
          View All
        </Button>
      </Flex>
      <Divider />
      <VStack spacing={5}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </VStack>
    </Flex>
  );
}
