import React from "react";
import Wrapper from "../../components/Wrapper";
import { Flex } from "@chakra-ui/react";
import MenuOverview from "./MenuOverview";
import SearchAndFilter from "../../components/SearchAndFilter";
import MenuList from "./MenuList";
import { useNavigate } from "react-router-dom";

const sampleMenus = [
  {
    name: "Grilled Chicken",
    price: 3500,
    status: "available",
    totalSold: 124,
    dateCreated: "2024-11-05T12:00:00Z",
    discount: 10,
  },
  {
    name: "Beef Suya",
    price: 2500,
    status: "sold out",
    totalSold: 220,
    dateCreated: "2024-10-15T08:30:00Z",
    discount: 0,
  },
  {
    name: "Jollof Rice",
    price: 1800,
    status: "available",
    totalSold: 300,
    dateCreated: "2024-09-12T14:10:00Z",
    discount: 5,
  },
  {
    name: "Grilled Chicken",
    price: 3500,
    status: "available",
    totalSold: 124,
    dateCreated: "2024-11-05T12:00:00Z",
    discount: 10,
  },
  {
    name: "Beef Suya",
    price: 2500,
    status: "sold out",
    totalSold: 220,
    dateCreated: "2024-10-15T08:30:00Z",
    discount: 0,
  },
  {
    name: "Jollof Rice",
    price: 1800,
    status: "available",
    totalSold: 300,
    dateCreated: "2024-09-12T14:10:00Z",
    discount: 5,
  },
];

export default function Menus() {
  const navigate = useNavigate();
  return (
    <Wrapper title="Menus">
      <Flex w="100%" align="start" direction="column" gap="1rem" p="1rem">
        <MenuOverview total={10} soldOut={30} available={12} />
        <SearchAndFilter
          title="Add Menu"
          onClick={() => navigate("/menus/add")}
        />
        <MenuList menus={sampleMenus} />
      </Flex>
    </Wrapper>
  );
}
