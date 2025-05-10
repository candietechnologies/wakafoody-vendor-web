import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import amountFormater from "../../utils/amount-formatter";
import { formatDate } from "../../utils/format-date";
import { formatTime } from "../../utils/formatTime";

const PackList = ({ options = [], onEdit }) => {
  return (
    <Box
      w="100%"
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="md"
      boxShadow="md">
      <Table variant="simple">
        <Thead bg={useColorModeValue("gray.100", "gray.700")}>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Price (₦)</Th>
            <Th>Date Created</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {options?.length === 0 ? (
            <Tr>
              <Td colSpan={3}>
                <Text textAlign="center" color="gray.500">
                  No options found.
                </Text>
              </Td>
            </Tr>
          ) : (
            options?.map((opt, idx) => (
              <Tr key={idx}>
                <Td textTransform="capitalize">{opt.name}</Td>
                <Td isNumeric>₦{amountFormater(opt.price)}</Td>
                <Td>
                  {formatDate(opt.createdAt)}, {formatTime(opt.createdAt)}
                </Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="orange"
                    onClick={() => onEdit(opt)}>
                    Edit
                  </Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PackList;
