import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FaChartLine } from "react-icons/fa";
import Chart from "react-apexcharts";

export default function HomeChart({ data }) {
  const iconColor = useColorModeValue("brand.100");
  const bgCard = useColorModeValue("white", "gray.700");

  const revenueChartOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: ["orangered"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        formatter: (val) => val,
      },
    },
    grid: {
      borderColor: "#E2E8F0",
    },
  };

  return (
    <Box
      bg={bgCard}
      p={{ base: 3, sm: 6 }}
      w="100%"
      mb="2rem"
      borderRadius="xl"
      borderWidth="1px"
      boxShadow="sm">
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="lg" fontWeight="semibold">
          Sales
        </Text>
        <HStack spacing={2} color={iconColor}>
          <FaChartLine />
          <Text fontSize="sm">All Time</Text>
        </HStack>
      </Flex>
      <Chart
        options={revenueChartOptions}
        series={[{ name: "Sales", data: data?.map((el) => el?.delivered) }]}
        type="area"
        height={350}
      />
    </Box>
  );
}
