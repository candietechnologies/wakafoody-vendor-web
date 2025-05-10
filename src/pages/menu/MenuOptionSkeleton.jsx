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
} from "@chakra-ui/react";

const MenuOptionListSkeleton = () => {
  const skeletonRows = Array.from({ length: 6 }); // Adjust row count as needed

  return (
    <Box
      w="100%"
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="md"
      boxShadow="md">
      <Table w="100%" variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Number of Choices</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {skeletonRows.map((_, idx) => (
            <Tr key={idx}>
              <Td>
                <Skeleton height="20px" width="120px" />
              </Td>
              <Td isNumeric>
                <Skeleton height="20px" width="50px" />
              </Td>
              <Td>
                <Skeleton height="30px" width="70px" borderRadius="md" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MenuOptionListSkeleton;
