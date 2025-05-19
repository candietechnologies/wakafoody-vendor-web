import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Chart from "react-apexcharts";

export default function ViewsChart({ data }) {
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
          Restaurant Views
        </Text>
      </Flex>
      <Chart
        options={revenueChartOptions}
        series={[{ name: "Sales", data: data?.map((el) => el?.amount) }]}
        type="area"
        height={350}
      />
    </Box>
  );
}
