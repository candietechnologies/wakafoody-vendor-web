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
import { formatTime } from "../../utils/formatTime";
import { formatDate } from "../../utils/format-date";

const MenuOptionList = ({ menuOptions = [], onView }) => {
  return (
    <Box
      w="100%"
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="md"
      boxShadow="md">
      <Table w="100%" variant="simple">
        <Thead bg={useColorModeValue("gray.100", "gray.700")}>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Number of Choices</Th>
            <Th>Date Created</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {menuOptions?.length === 0 ? (
            <Tr>
              <Td colSpan={3}>
                <Text textAlign="center" color="gray.500">
                  No menu options available.
                </Text>
              </Td>
            </Tr>
          ) : (
            menuOptions?.map((opt, idx) => (
              <Tr key={idx}>
                <Td textTransform="capitalize">{opt.name}</Td>
                <Td textAlign="center" isNumeric>
                  {opt?.options?.length}
                </Td>
                <Td>
                  {formatDate(opt.createdAt)}, {formatTime(opt.createdAt)}
                </Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="orange"
                    onClick={() => onView(opt)}>
                    View
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

export default MenuOptionList;
