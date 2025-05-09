import React, { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  Icon,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { FiSearch, FiFilter } from "react-icons/fi";

const FILTERS = ["all", "available", "sold out"];

const SearchAndFilter = ({ onSearch, onFilterChange, title, onClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <Box w="100%">
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiSearch} color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={handleSearchChange}
          bg={useColorModeValue("white", "gray.800")}
        />
      </InputGroup>

      <Flex w="100%" align="center" justify="space-between">
        <HStack spacing={3}>
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              colorScheme={activeFilter === filter ? "orange" : "gray"}
              variant={activeFilter === filter ? "solid" : "outline"}
              leftIcon={<FiFilter />}
              size="sm"
              textTransform="capitalize">
              {filter}
            </Button>
          ))}
        </HStack>

        <Button onClick={onClick} color="brand.100" size="md">
          {title}
        </Button>
      </Flex>
    </Box>
  );
};

export default SearchAndFilter;
