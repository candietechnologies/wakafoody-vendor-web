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
} from "@chakra-ui/react";
import { FiList, FiXCircle, FiCheckCircle } from "react-icons/fi";

const StatCard = ({ label, value, icon, color }) => {
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
          <StatNumber fontSize="2xl" fontWeight="bold">
            {value}
          </StatNumber>
        </Box>
        <Icon as={icon} boxSize={8} color={color} />
      </Box>
    </Stat>
  );
};

const MenuOverview = ({ total, soldOut, available }) => {
  return (
    <SimpleGrid w="100%" columns={{ base: 1, md: 3 }} spacing={6}>
      <StatCard label="Total" value={total} icon={FiList} color="blue.500" />
      <StatCard
        label="Sold Out"
        value={soldOut}
        icon={FiXCircle}
        color="red.500"
      />
      <StatCard
        label="Available"
        value={available}
        icon={FiCheckCircle}
        color="green.500"
      />
    </SimpleGrid>
  );
};

export default MenuOverview;
