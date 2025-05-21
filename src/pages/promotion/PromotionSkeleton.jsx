import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  SkeletonText,
  Box,
} from "@chakra-ui/react";

const PromotionTableSkeleton = () => {
  const skeletonRows = new Array(3).fill(0);

  return (
    <Box bg="white" overflowX="scroll" p={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th whiteSpace="nowrap">Name</Th>
            <Th whiteSpace="nowrap">Image</Th>
            <Th whiteSpace="nowrap">Discount</Th>
            <Th whiteSpace="nowrap">Discount Price ($)</Th>
            <Th whiteSpace="nowrap">Original Price ($)</Th>
            <Th whiteSpace="nowrap">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {skeletonRows.map((_, index) => (
            <Tr key={index}>
              <Td whiteSpace="nowrap">
                <Skeleton height="16px" width="80px" />
              </Td>
              <Td whiteSpace="nowrap">
                <Skeleton boxSize="50px" borderRadius="md" />
              </Td>
              <Td whiteSpace="nowrap">
                <Skeleton height="16px" width="50px" />
              </Td>
              <Td whiteSpace="nowrap">
                <Skeleton height="16px" width="60px" />
              </Td>
              <Td whiteSpace="nowrap">
                <Skeleton height="16px" width="60px" />
              </Td>
              <Td whiteSpace="nowrap">
                <Skeleton height="32px" width="60px" borderRadius="md" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PromotionTableSkeleton;
