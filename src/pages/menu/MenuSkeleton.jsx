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
  useColorModeValue,
  Box,
  Button,
} from "@chakra-ui/react";

const MenuListSkeleton = () => {
  const skeletonRows = Array.from({ length: 6 }); // Adjust row count as needed

  return (
    <Table bg="white" variant="simple" size="md">
      <Thead bg={useColorModeValue("gray.100", "gray.700")}>
        <Tr>
          <Th>S/N</Th>
          <Th>Name</Th>
          <Th isNumeric>Price</Th>
          <Th>Status</Th>
          <Th isNumeric>Total Sold</Th>
          <Th>Date Created</Th>
          <Th isNumeric>Discount (%)</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {skeletonRows.map((_, idx) => (
          <Tr key={idx}>
            <Td>
              <Skeleton height="20px" width="20px" />
            </Td>
            <Td>
              <SkeletonText noOfLines={1} spacing="2" width="100px" />
            </Td>
            <Td isNumeric>
              <Skeleton height="20px" width="40px" />
            </Td>
            <Td>
              <Skeleton height="20px" width="70px" />
            </Td>
            <Td isNumeric>
              <Skeleton height="20px" width="30px" />
            </Td>
            <Td>
              <SkeletonText noOfLines={1} spacing="2" width="120px" />
            </Td>
            <Td isNumeric>
              <Skeleton height="20px" width="30px" />
            </Td>
            <Td>
              <Skeleton height="30px" width="50px" borderRadius="md" />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default MenuListSkeleton;
