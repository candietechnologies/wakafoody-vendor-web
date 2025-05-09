import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Box,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

const statusColor = {
  available: "green",
  "sold out": "red",
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
};

const MenuList = ({ menus }) => {
  return (
    <Table variant="simple" size="md">
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
        {menus.map((menu, idx) => (
          <Tr key={idx}>
            <Td fontWeight="medium">{idx + 1}</Td>
            <Td fontWeight="medium">{menu.name}</Td>
            <Td isNumeric>₦{menu.price.toLocaleString()}</Td>
            <Td>
              <Badge colorScheme={statusColor[menu.status]} px={2} py={1}>
                {menu.status.toUpperCase()}
              </Badge>
            </Td>
            <Td isNumeric>{menu.totalSold}</Td>
            <Td>{formatDate(menu.dateCreated)}</Td>
            <Td isNumeric>{menu.discount}%</Td>
            <Td>
              <Button size="sm" colorScheme="orange">
                Edit
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default MenuList;
