import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  VStack,
  HStack,
  Flex,
  Avatar,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import amountFormater from "../../utils/amount-formatter";
import EmptyComponent from "../../components/EmptyComponent";
import ViewsChart from "./charts/Views";
import SalesChart from "./charts/Sales";

const AnalyticsContainer = ({ data }) => {
  const stats = [
    {
      label: "Total Payout",
      value: `₦${amountFormater(data?.totalPayout || 0)}`,
    },
    {
      label: "Avg. Accept Time",
      value: `${data?.averageAcceptTime?.toFixed(2) || 0} mins`,
    },
    {
      label: "Avg. Cooking Time",
      value: `${data?.averageCookingTime?.toFixed(2) || 0} mins`,
    },
    {
      label: "Avg. Pickup Time",
      value: `${data?.averagePickupTime?.toFixed(2) || 0} mins`,
    },
    {
      label: "Completion Rate",
      value: `${data?.orderCompletionRate?.toFixed(2) || 0}%`,
    },
    {
      label: "Cancellation Rate",
      value: `${data?.orderCancellationRate?.toFixed(2) || 0}%`,
    },
    {
      label: "Rejection Rate",
      value: `${data?.orderRejectionRate?.toFixed(2) || 0}%`,
    },
    {
      label: "Avg. Order Value",
      value: `₦${data?.averageOrderValue?.toFixed(2) || "0.00"}`,
    },
    {
      label: "Repeat Order Rate",
      value: `${data?.repeatOrderRate?.toFixed(2) || 0}%`,
    },
    { label: "Total Customers", value: data?.totalCustomer || 0 },
    { label: "Total Orders", value: data?.totalOrders || 0 },
  ];

  return (
    <Box p={{ lg: 6, base: 2 }} bg={"white"} minH="90vh" overflowY="auto">
      {/* Tabs Section */}
      <Tabs colorScheme="orange" variant="enclosed">
        <TabList>
          <Tab whiteSpace="nowrap">Reviews & Ratings</Tab>
          <Tab whiteSpace="nowrap">Best Selling</Tab>
          <Tab whiteSpace="nowrap">Stats</Tab>
          <Tab whiteSpace="nowrap">Charts</Tab>
        </TabList>

        <TabPanels>
          {/* Reviews */}
          <TabPanel>
            <Flex h="100%" direction="column" gap={4} align="stretch">
              {data?.reviews?.map((r, idx) => (
                <Box
                  key={idx}
                  p={{ lg: 4, base: 2 }}
                  borderWidth="1px"
                  borderRadius="md">
                  <HStack justify="space-between">
                    <Text textTransform="capitalize" fontWeight="bold">
                      {r?.user?.firstName} {r?.user?.lastName}
                    </Text>
                    <HStack>
                      {Array.from({ length: r?.rating }).map((_, i) => (
                        <StarIcon key={i} color="orange.500" />
                      ))}
                    </HStack>
                  </HStack>
                  <Text fontSize={{ lg: "14px", base: "13px" }} mt={2}>
                    {r?.review}
                  </Text>
                </Box>
              ))}
              {data?.reviews && data?.reviews?.length === 0 && (
                <EmptyComponent />
              )}
            </Flex>
          </TabPanel>

          {/* Top Menus */}
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {data?.bestSelling?.map((menu, idx) => (
                <Box key={idx} p={4} borderWidth="1px" borderRadius="md">
                  <HStack justify="space-between">
                    <HStack>
                      <Avatar
                        src={menu?.image}
                        size={{ lg: "sm", base: "xs" }}
                      />
                      <Text
                        fontSize="14px"
                        textTransform="capitalize"
                        fontWeight="semibold">
                        {menu?.name}
                      </Text>
                    </HStack>
                    <Text>{menu?.count} orders</Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
            {data?.bestSelling && data?.bestSelling?.length === 0 && (
              <EmptyComponent />
            )}
          </TabPanel>

          <TabPanel>
            <Box
              p={{ lg: 6, base: 2 }}
              bg={"white"}
              borderRadius="md"
              shadow="md">
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
                {stats.map((stat, index) => (
                  <Stat key={index} p={4} borderWidth="1px" borderRadius="md">
                    <StatLabel>{stat.label}</StatLabel>
                    <StatNumber
                      fontWeight="semibold"
                      fontSize={{ base: "16px", lg: "20px" }}>
                      {stat.value}
                    </StatNumber>
                  </Stat>
                ))}
              </SimpleGrid>
            </Box>
          </TabPanel>

          {/* Charts */}
          <TabPanel>
            <Box>
              <SalesChart data={data?.salesChart} />
              <ViewsChart data={data?.viewsChart} />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AnalyticsContainer;
