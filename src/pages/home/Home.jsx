import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import {
  Flex,
  Box,
  Switch,
  Spinner,
  Text,
  HStack,
  Select,
} from "@chakra-ui/react";
import Overview from "./Overview";
import HomeChart from "./HomeChart";
import { useRestaurant } from "../../context/restaurant";
import useGet from "../../hooks/useGet";
import { url } from "../../utils/lib";
import amountFormater from "../../utils/amount-formatter";
import OrderTable from "../orders/OrderTable";
import OrderList from "../orders/OrderList";
import { toast } from "react-toastify";
import { usePost } from "../../hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const [filter, setFilter] = useState("all time");
  const { activeRestaurant, selectRestaurant } = useRestaurant();

  const queryclient = useQueryClient();

  const restaurantId = activeRestaurant?._id;

  const { data, isPending } = useGet(
    `${url}/v1/overview?restaurant=${restaurantId}&filter=${filter}`,
    `menu-${restaurantId}`
  );

  const result = data?.data;

  function handleSuccess(data) {
    toast.success(
      `${activeRestaurant?.name} ${
        activeRestaurant?.isOpen ? "closed" : "opened"
      }`
    );

    selectRestaurant(data?.data);
  }

  const toggleHandler = usePost({
    url: `${url}/v1/restaurant/${activeRestaurant?._id}/toggle`,
    queryKey: "restaurant-list",
    title: "",
    onSuccess: handleSuccess,
  });

  useEffect(() => {
    queryclient.invalidateQueries({ queryKey: [`menu-${restaurantId}`] });
  }, [filter, restaurantId, queryclient]);

  return (
    <Wrapper>
      <Flex
        w="100%"
        h="100%"
        direction="column"
        gap="1rem"
        p={{ lg: 4, base: 1 }}>
        <Overview
          sales={`₦${amountFormater(result?.totalSales || 0)}`}
          ongoing={result?.ongoingOrders}
          completed={result?.completedOrders}
          isLoading={isPending}
        />
        <HStack w="100%" justify="space-between">
          <Box maxW="200px">
            <Select
              bg="white"
              outline="none"
              focusBorderColor="#FFF0E6"
              placeholder="Date"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}>
              {[
                "today",
                "yesterday",
                "this week",
                "this month",
                "this year",
                "all time",
              ].map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </Box>
          <HStack align="flex-end">
            <Text
              fontSize="sm"
              fontWeight="500"
              color={
                activeRestaurant?.isOpen === "open" ? "green.500" : "red.500"
              }>
              {activeRestaurant?.isOpen ? "Open" : "Closed"}
            </Text>
            {toggleHandler.isPending ? (
              <Spinner colorScheme="orange" size="sm" />
            ) : (
              <Switch
                isChecked={activeRestaurant?.isOpen}
                onChange={() => {
                  toggleHandler.mutate({});
                }}
                colorScheme="orange"
              />
            )}
          </HStack>
        </HStack>
        <HomeChart data={result?.chartData} />
        {!isPending && (
          <>
            <Box display={{ base: "none", lg: "block" }} w="100%">
              <OrderTable list={result?.newOrders} />
            </Box>
            <Box display={{ lg: "none", base: "block" }} w="100%">
              <OrderList list={result?.newOrders} />
            </Box>
          </>
        )}
      </Flex>
    </Wrapper>
  );
}
