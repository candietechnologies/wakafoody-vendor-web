import React from "react";
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

const SearchAndFilter = ({
  setSearchTerm,
  searchTerm,
  title,
  onClick,
  setActiveFilter,
  activeFilter,
  FILTERS = ["all", "available", "sold out"],
  placeholder,
  component,
}) => {
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <Box w="100%">
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiSearch} color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder={placeholder || "Search menu items..."}
          value={searchTerm}
          onChange={handleSearchChange}
          bg={useColorModeValue("white", "gray.800")}
        />
      </InputGroup>

      <Flex
        w="100%"
        align={{ lg: "center", base: "start" }}
        direction={{ lg: "row", base: "column" }}
        gap={{ base: "1rem" }}
        justify="space-between">
        <HStack spacing={3}>
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              colorScheme={activeFilter === filter ? "orange" : "gray"}
              variant={activeFilter === filter ? "solid" : "outline"}
              leftIcon={<FiFilter />}
              size="sm"
              textTransform="capitalize">
              {filter}
            </Button>
          ))}
        </HStack>

        {component || (
          <Button onClick={onClick} color="brand.100" size="md">
            {title}
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default SearchAndFilter;
