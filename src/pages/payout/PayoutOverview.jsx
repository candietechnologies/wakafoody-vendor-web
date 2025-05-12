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
import { FiCheckCircle } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { GrInProgress } from "react-icons/gr";
import { FaList } from "react-icons/fa";
import amountFormater from "../../utils/amount-formatter";

const StatCard = ({ label, value, icon, color, isLoading }) => {
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
            {label}
          </StatLabel>
          <StatNumber fontSize={{ lg: "xl", base: "lg" }} fontWeight="semibold">
            {isLoading ? (
              <Skeleton height="20px" width="80px" />
            ) : (
              `₦${amountFormater(value || 0)}`
            )}
          </StatNumber>
        </Box>
        <Icon as={icon} boxSize={8} color={color} />
      </Box>
    </Stat>
  );
};

const PayoutOverview = ({ disbursed, pending, balance, isLoading }) => {
  return (
    <SimpleGrid w="100%" columns={{ base: 1, md: 3 }} spacing={4}>
      <StatCard
        isLoading={isLoading}
        label="Balance"
        value={balance}
        icon={IoWalletOutline}
        color="blue.500"
      />

      <StatCard
        isLoading={isLoading}
        label="Processing"
        value={pending}
        icon={GrInProgress}
        color="orange.400"
      />
      <StatCard
        isLoading={isLoading}
        label="Disbursed"
        value={disbursed}
        icon={FiCheckCircle}
        color="green.500"
      />
    </SimpleGrid>
  );
};

export default PayoutOverview;
