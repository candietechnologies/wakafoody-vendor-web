import React from "react";
import { HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { FaList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

const ViewSwitch = ({ activeView, onChange }) => {
  return (
    <HStack spacing={2}>
      <Tooltip label="List View">
        <IconButton
          icon={<FaList />}
          aria-label="List View"
          variant={activeView === "list" ? "solid" : "outline"}
          colorScheme={activeView === "list" ? "orange" : "gray"}
          onClick={() => onChange("list")}
          size="sm"
          bg={activeView === "list" ? "brand.100" : "white"}
        />
      </Tooltip>
      <Tooltip label="Grid View">
        <IconButton
          icon={<IoGrid />}
          aria-label="Grid View"
          variant={activeView === "grid" ? "solid" : "outline"}
          colorScheme={activeView === "grid" ? "orange" : "gray"}
          onClick={() => onChange("grid")}
          size="sm"
          bg={activeView === "grid" ? "brand.100" : "white"}
        />
      </Tooltip>
    </HStack>
  );
};

export default ViewSwitch;
