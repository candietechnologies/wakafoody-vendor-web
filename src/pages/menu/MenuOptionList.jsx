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

const MenuOptionList = ({ menuOptions = [], onView }) => {
  return (
    <Box
      p={6}
      w="100%"
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="md"
      boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Menu Options
      </Text>

      <Table w="100%" variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Number of Choices</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {menuOptions.length === 0 ? (
            <Tr>
              <Td colSpan={3}>
                <Text textAlign="center" color="gray.500">
                  No menu options available.
                </Text>
              </Td>
            </Tr>
          ) : (
            menuOptions.map((opt, idx) => (
              <Tr key={idx}>
                <Td>{opt.name}</Td>
                <Td isNumeric>{opt.count}</Td>
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
