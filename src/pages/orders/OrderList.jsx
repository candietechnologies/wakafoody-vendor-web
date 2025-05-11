import { Flex, Box, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import OrderCard from "../../components/OrderCard";

export default function OrderList({ list }) {
  return (
    <Fragment>
      {list && list?.length > 0 ? (
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
      ) : (
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
    </Fragment>
  );
}
