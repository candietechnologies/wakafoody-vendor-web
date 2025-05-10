import { Flex } from "@chakra-ui/react";
import React from "react";
import OrderCard from "../../components/OrderCard";

export default function OrderList({ list }) {
  return (
    <Flex
      w="100%"
      align="start"
      gap="1rem"
      flexWrap="wrap"
      justify="space-between">
      {list?.map((order, i) => (
        <OrderCard w={{ lg: "30%", base: "100%" }} key={i} order={order} />
      ))}
    </Flex>
  );
}
