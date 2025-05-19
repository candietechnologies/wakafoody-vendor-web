import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Flex, Box, Select } from "@chakra-ui/react";
import AnalyticsOverview from "./AnalyticsOverview";
import AnalyticsContainer from "./AnalyticsContainer";
import useGet from "../../hooks/useGet";
import { url } from "../../utils/lib";
import { useRestaurant } from "../../context/restaurant";
import Spinner from "../../components/Spinner";
import amountFormater from "../../utils/amount-formatter";
import { useQueryClient } from "@tanstack/react-query";

export default function Analytics() {
  const [filter, setFilter] = useState("all time");
  const { activeRestaurant } = useRestaurant();
  const queryclient = useQueryClient();

  const { data, isPending } = useGet(
    `${url}/v1/analytics/vendor?filter=${filter}&restaurant=${activeRestaurant?._id}`,
    "analytics"
  );

  useEffect(() => {
    queryclient.invalidateQueries({ queryKey: ["analytics"] });
  }, [filter, queryclient, activeRestaurant?._id]);

  if (isPending) return <Spinner />;

  return (
    <Wrapper showBar={false}>
      <Flex
        w="100%"
        h="100%"
        direction="column"
        gap="1rem"
        p={{ lg: 4, base: 1 }}>
        <AnalyticsOverview
          isLoading={isPending}
          sales={`₦${amountFormater(data?.data?.totalSales)}`}
          customers={data?.data?.totalCustomer || 0}
          views={data?.data?.totalViews || 0}
        />
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
        <AnalyticsContainer data={data?.data} />
      </Flex>
    </Wrapper>
  );
}
