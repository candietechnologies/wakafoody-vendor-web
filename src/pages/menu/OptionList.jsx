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

const OptionList = ({ options = [], onEdit }) => {
  return (
    <Box
      w="100%"
      p={6}
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="md"
      boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Options
      </Text>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Price (₦)</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {options.length === 0 ? (
            <Tr>
              <Td colSpan={3}>
                <Text textAlign="center" color="gray.500">
                  No options found.
                </Text>
              </Td>
            </Tr>
          ) : (
            options.map((opt, idx) => (
              <Tr key={idx}>
                <Td>{opt.name}</Td>
                <Td isNumeric>{opt.price}</Td>
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

export default OptionList;
