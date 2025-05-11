import React, { Fragment, useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Box, Flex, Select } from "@chakra-ui/react";
import OrderOverview from "./OrderOverview";
import SearchAndFilter from "../../components/SearchAndFilter";
import OrderList from "./OrderList";
import useGet from "../../hooks/useGet";
import { url } from "../../utils/lib";
import { useQueryClient } from "@tanstack/react-query";
import { useRestaurant } from "../../context/restaurant";
import OrderSkeleton from "./OrderSkeleton";
import OrderTable from "./OrderTable";
import ViewSwitch from "./ViewSwitch";

export default function Order() {
  const queryClient = useQueryClient();
  const { activeRestaurant } = useRestaurant();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);

  const [view, setView] = useState("grid");

  const restaurantId = activeRestaurant?._id;

  const { data, isPending } = useGet(
    `${url}/v1/restaurant/${restaurantId}/orders?type=${filter}`,
    `orders-${restaurantId}`
  );

  const { data: statData, isPending: isStatPending } = useGet(
    `${url}/v1/restaurant/${restaurantId}/orders/stats`,
    `orders-${restaurantId}-stats`
  );

  const stats = statData?.data;

  useEffect(() => {
    if (!data?.data) return;

    if (search) {
      const filtered = data?.data?.filter((el) =>
        el.orderId.toLowerCase().includes(search.trim().toLowerCase())
      );
      setList(filtered);
      return;
    }

    setList(data?.data);
  }, [data?.data, search]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [`orders-${restaurantId}`] });
    queryClient.invalidateQueries({
      queryKey: [`orders-${restaurantId}-stats`],
    });
  }, [restaurantId, queryClient, filter]);

  return (
    <Wrapper showBar={false} title="orders">
      <Flex w="100%" direction="column" gap="1rem" p={{ lg: 4, base: 1 }}>
        <OrderOverview
          completedOrders={stats?.completedOrders}
          completedOrdersCount={stats?.ongoingOrdersCount}
          ongoingOrders={stats?.ongoingOrders}
          ongoingOrdersCount={stats?.ongoingOrdersCount}
          newOrderCount={stats?.newOrdersCount}
          newOrders={stats?.newOrders}
          isLoading={isStatPending}
        />
        <SearchAndFilter
          placeholder="Search Order ID"
          FILTERS={["all", "new", "ongoing", "completed"]}
          activeFilter={filter}
          setActiveFilter={setFilter}
          searchTerm={search}
          setSearchTerm={setSearch}
          component={<ViewSwitch activeView={view} onChange={setView} />}
        />

        <Flex w="100%" align="start" direction="column">
          {isPending ? (
            <OrderSkeleton w={{ lg: "30%", base: "100%" }} />
          ) : (
            <Fragment>
              {view === "list" ? (
                <OrderTable list={list} />
              ) : (
                <OrderList list={list} />
              )}
            </Fragment>
          )}
        </Flex>
      </Flex>
    </Wrapper>
  );
}

function Filter({ value, setValue }) {
  return (
    <Box minW="200px">
      <Select
        bg="white"
        outline="none"
        focusBorderColor="#FFF0E6"
        placeholder="Filter"
        value={value}
        onChange={(e) => setValue(e.target.value)}>
        {[
          "today",
          "yesterday",
          "3 days",
          "7 days",
          "last week",
          "this month",
          "last month",
          "3 months",
          "6 months",
          "all time",
        ].map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </Select>
    </Box>
  );
}
