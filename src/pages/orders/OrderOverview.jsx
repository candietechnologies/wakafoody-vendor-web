import React from "react";
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Skeleton,
  SimpleGrid,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FiCheckCircle, FiRefreshCw, FiPlus } from "react-icons/fi";
import amountFormater from "../../utils/amount-formatter";

const StatCard = ({ label, value, icon, color, isLoading, count }) => {
  return (
    <Stat
      flex="1"
      px={{ base: 4, md: 6 }}
      py="5"
      shadow="md"
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      rounded="lg"
      bg={useColorModeValue("white", "gray.800")}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <StatLabel fontWeight="medium" isTruncated>
            {label} <small>({count})</small>
          </StatLabel>
          <StatNumber fontSize="2xl" fontWeight="bold">
            {isLoading ? (
              <Skeleton height="20px" width="80px" />
            ) : (
              `₦${amountFormater(value)}`
            )}
          </StatNumber>
        </Box>
        <Icon as={icon} boxSize={8} color={color} />
      </Box>
    </Stat>
  );
};

const OrderOverview = ({
  completedOrders,
  ongoingOrders,
  newOrders,
  isLoading,
  newOrderCount,
  ongoingOrdersCount,
  completedOrdersCount,
}) => {
  return (
    <SimpleGrid w="100%" columns={{ base: 1, md: 3 }} spacing={6}>
      <StatCard
        isLoading={isLoading}
        label="New Orders"
        value={newOrders}
        icon={FiPlus}
        color="blue.500"
        count={newOrderCount}
      />

      <StatCard
        isLoading={isLoading}
        label="Ongoing Orders"
        value={ongoingOrders}
        icon={FiRefreshCw}
        color="orange.400"
        count={ongoingOrdersCount}
      />
      <StatCard
        isLoading={isLoading}
        label="Completed Orders"
        value={completedOrders}
        icon={FiCheckCircle}
        color="green.500"
        count={completedOrdersCount}
      />
    </SimpleGrid>
  );
};

export default OrderOverview;
