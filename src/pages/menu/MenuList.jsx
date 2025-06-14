import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
  Button,
  Text,
  Avatar,
  Flex,
  Box,
  Select,
} from "@chakra-ui/react";
import { formatDate } from "../../utils/format-date";
import { formatTime } from "../../utils/formatTime";
import amountFormater from "../../utils/amount-formatter";
import { useNavigate } from "react-router-dom";

const statusColor = {
  true: "green",
  false: "red",
};

const MenuList = ({ menus = [], categories, collections }) => {
  const tableBg = useColorModeValue("gray.100", "gray.700");
  const [category, setCategory] = useState("");
  const [collection, setCollection] = useState("");
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!menus) return;
    if (category) {
      setList(menus.filter((el) => el.category === category));
      return;
    }

    if (collection) {
      setList(menus.filter((el) => el.collectionName === collection));
      return;
    }
    setList(menus);
  }, [category, collection, menus]);

  return (
    <Flex w="100%" align="start" direction="column" gap="1rem">
      <Flex w="100%" align="center" gap="1rem">
        <Filter
          placeholder="Filter by category"
          options={categories?.map((el) => el.name)}
          value={category}
          setValue={setCategory}
        />
        <Filter
          placeholder="Filter by collection"
          options={collections?.map((el) => el.name)}
          value={collection}
          setValue={setCollection}
        />
      </Flex>
      <Box bg="white" w="100%" overflowX="scroll">
        <Table overflowX="scroll" w="100%" variant="simple" size="md">
          <Thead bg={tableBg}>
            <Tr>
              <Th>S/N</Th>
              <Th>Image</Th>
              <Th whiteSpace="nowrap">Name</Th>
              <Th whiteSpace="nowrap">Category</Th>
              <Th whiteSpace="nowrap">collection</Th>
              <Th whiteSpace="nowrap" isNumeric>
                Price
              </Th>
              <Th whiteSpace="nowrap">Status</Th>
              <Th whiteSpace="nowrap" isNumeric>
                Total Sold
              </Th>
              <Th whiteSpace="nowrap">Date</Th>
              <Th whiteSpace="nowrap" isNumeric>
                Discount (%)
              </Th>
              <Th whiteSpace="nowrap">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list && list.length === 0 ? (
              <Tr>
                <Td colSpan={8}>
                  <Text textAlign="center" color="gray.500" py={4}>
                    No menu items available.
                  </Text>
                </Td>
              </Tr>
            ) : (
              list.map((menu, idx) => (
                <Tr key={idx}>
                  <Td fontWeight="medium">{idx + 1}</Td>
                  <Td textTransform="capitalize" fontWeight="medium">
                    <Avatar
                      size={{ base: "xs", lg: "sm" }}
                      src={menu.image}
                      title={menu.name}
                    />
                  </Td>
                  <Td
                    whiteSpace="nowrap"
                    fontSize={{ lg: "14px", base: "13px" }}
                    textTransform="capitalize"
                    fontWeight="medium">
                    {menu.name}
                  </Td>
                  <Td
                    whiteSpace="nowrap"
                    fontSize={{ lg: "14px", base: "13px" }}
                    textTransform="capitalize"
                    fontWeight="medium">
                    {menu.category}
                  </Td>
                  <Td
                    whiteSpace="nowrap"
                    fontSize={{ lg: "14px", base: "13px" }}
                    textTransform="capitalize"
                    fontWeight="medium">
                    {menu.collectionName}
                  </Td>
                  <Td
                    whiteSpace="nowrap"
                    fontSize={{ lg: "14px", base: "13px" }}
                    isNumeric>
                    ₦{amountFormater(menu.price || 0)}
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={statusColor[menu.inStock]}
                      px={2}
                      py={1}>
                      {menu.inStock ? "AVAILABLE" : "SOLDOUT"}
                    </Badge>
                  </Td>
                  <Td
                    whiteSpace="nowrap"
                    fontSize={{ lg: "14px", base: "13px" }}
                    isNumeric>
                    {menu.totalUnitsSold}
                  </Td>
                  <Td
                    whiteSpace="nowrap"
                    fontSize={{ lg: "14px", base: "13px" }}>
                    {formatDate(menu.createdAt)}, {formatTime(menu.createdAt)}
                  </Td>
                  <Td isNumeric>{menu.discount || 0}%</Td>
                  <Td>
                    <Button
                      onClick={() =>
                        navigate(`/menus/add?id=${menu?.username}`)
                      }
                      size="sm"
                      colorScheme="orange">
                      Edit
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default MenuList;

function Filter({ value, setValue, options = [], placeholder }) {
  return (
    <Box minW="200px">
      <Select
        bg="white"
        outline="none"
        focusBorderColor="#FFF0E6"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}>
        {options.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </Select>
    </Box>
  );
}
