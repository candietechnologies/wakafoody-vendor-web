import React from "react";
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Skeleton,
} from "@chakra-ui/react";
import { FiList, FiXCircle, FiCheckCircle } from "react-icons/fi";

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
      bg="white">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <StatLabel fontWeight="medium" isTruncated>
            {label}
          </StatLabel>
          <StatNumber fontSize={{ lg: "xl", base: "lg" }} fontWeight="semibold">
            {isLoading ? <Skeleton height="20px" width="80px" /> : value}
          </StatNumber>
        </Box>
        <Icon as={icon} boxSize={8} color={color} />
      </Box>
    </Stat>
  );
};

const MenuOverview = ({ total, soldOut, available, isLoading }) => {
  return (
    <SimpleGrid w="100%" columns={{ base: 1, md: 3 }} spacing={4}>
      <StatCard
        isLoading={isLoading}
        label="Total"
        value={total}
        icon={FiList}
        color="blue.500"
      />
      <StatCard
        isLoading={isLoading}
        label="Sold Out"
        value={soldOut}
        icon={FiXCircle}
        color="red.500"
      />
      <StatCard
        isLoading={isLoading}
        label="Available"
        value={available}
        icon={FiCheckCircle}
        color="green.500"
      />
    </SimpleGrid>
  );
};

export default MenuOverview;
