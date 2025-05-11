import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  SkeletonText,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const PayoutListSkeleton = () => {
  const tableBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box bg="white" w="100%" overflowX="auto">
      <Table variant="simple">
        <Thead bg={tableBg}>
          <Tr>
            <Th>Amount</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.from({ length: 10 }).map((_, idx) => (
            <Tr key={idx}>
              <Td>
                <Skeleton height="20px" width="60px" />
              </Td>
              <Td>
                <Skeleton height="20px" width="80px" />
              </Td>
              <Td>
                <SkeletonText noOfLines={1} width="120px" />
              </Td>
              <Td>
                <Skeleton height="32px" width="32px" borderRadius="full">
                  <IconButton icon={<ViewIcon />} aria-label="View" size="sm" />
                </Skeleton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PayoutListSkeleton;
