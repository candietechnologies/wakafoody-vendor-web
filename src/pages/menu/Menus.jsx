import React, { useEffect, useState } from "react";
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Wrapper from "../../components/Wrapper";
import SearchAndFilter from "../../components/SearchAndFilter";

import MenuOverview from "./MenuOverview";
import MenuList from "./MenuList";
import MenuOptionList from "./MenuOptionList";
import OptionList from "./OptionList";
import PackList from "./PackList";

import MenuListSkeleton from "./MenuSkeleton";
import MenuOptionListSkeleton from "./MenuOptionSkeleton";
import OptionSkeleton from "./OptionSkeleton";

import useGet from "../../hooks/useGet";
import { useRestaurant } from "../../context/restaurant";
import { url } from "../../utils/lib";

export default function Menus() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { activeRestaurant } = useRestaurant();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [menuList, setMenuList] = useState([]);
  const [menuOptionList, setMenuOptionList] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [packList, setPackList] = useState([]);

  const restaurantId = activeRestaurant?._id;

  const { data: menuData, isPending: isMenuLoading } = useGet(
    `${url}/v1/menu?restaurant=${restaurantId}`,
    `menu-${restaurantId}`
  );

  const { data: menuOptionData, isPending: isMenuOptionLoading } = useGet(
    `${url}/v1/menu-options?restaurant=${restaurantId}`,
    `menu-options-${restaurantId}`
  );

  const { data: optionData, isPending: isOptionLoading } = useGet(
    `${url}/v1/option?restaurant=${restaurantId}`,
    `options-${restaurantId}`
  );

  const { data: packData, isPending: isPackLoading } = useGet(
    `${url}/v1/pack?restaurant=${restaurantId}`,
    `packs-${restaurantId}`
  );

  const { data: statData, isPending: isStatLoading } = useGet(
    `${url}/v1/menu/stats?restaurant=${restaurantId}`,
    `stats-${restaurantId}`
  );

  const { data: categoryData } = useGet(
    `${url}/v1/category/vendor`,
    `categories`
  );
  const { data: collectionData } = useGet(
    `${url}/v1/collection?restaurant=${restaurantId}`,
    `collection-${restaurantId}`
  );

  const categoryList = categoryData?.data || [];
  const collectionList = collectionData?.data || [];

  // Populate initial state
  useEffect(() => {
    if (!menuData || !menuOptionData || !optionData || !packData) return;

    setMenuList(menuData.data);
    setMenuOptionList(menuOptionData.data);
    setOptionList(optionData.data);
    setPackList(packData.data);
  }, [menuData, menuOptionData, optionData, packData]);

  // Filter on search
  useEffect(() => {
    if (!menuData || !menuOptionData || !optionData || !packData) return;
    if (!search && !filter) {
      setMenuList(menuData?.data);
      setMenuOptionList(menuOptionData?.data);
      setOptionList(optionData?.data);
      setPackList(packData?.data);
      return;
    }

    const term = search.trim().toLowerCase();
    const filterTerm = filter.trim().toLowerCase();

    const filterByName = (list) =>
      list?.filter((el) => el.name?.toLowerCase().includes(term)) || [];

    if (filterTerm) {
      setMenuList(
        menuData?.data?.filter((el) =>
          filterTerm === "available"
            ? el.inStock
            : filterTerm === "sold out"
            ? !el.inStock
            : el
        )
      );
    } else {
      setMenuList(
        menuData?.data?.filter(
          (el) =>
            el.name?.toLowerCase().includes(term) ||
            el.description?.toLowerCase().includes(term)
        ) || []
      );
      setMenuOptionList(filterByName(menuOptionData?.data?.data));
      setOptionList(filterByName(optionData?.data?.data));
      setPackList(filterByName(packData?.data?.data));
    }
  }, [search, menuData, menuOptionData, optionData, packData, filter]);

  // Invalidate queries on restaurant change
  useEffect(() => {
    if (!restaurantId) return;

    const keys = [
      `menu-${restaurantId}`,
      `menu-options-${restaurantId}`,
      `options-${restaurantId}`,
      `packs-${restaurantId}`,
      `stats-${restaurantId}`,
      `collection-${restaurantId}`,
    ];

    keys.forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
  }, [restaurantId, queryClient]);

  return (
    <Wrapper title="Menus">
      <Flex w="100%" direction="column" gap="1rem" p={{ lg: 4, base: 1 }}>
        <MenuOverview
          total={statData?.data?.total}
          soldOut={statData?.data?.soldout}
          available={statData?.data?.available}
          isLoading={isStatLoading}
        />

        <SearchAndFilter
          setActiveFilter={setFilter}
          activeFilter={filter}
          searchTerm={search}
          setSearchTerm={setSearch}
          title="Add Menu"
          onClick={() => navigate("/menus/add")}
        />

        <Tabs
          variant="unstyled"
          colorScheme="orange"
          size={{ base: "sm", md: "md" }}
          w="100%">
          <TabList mb="0.5rem">
            <Tab
              _selected={{ bg: "#FF4500", color: "white" }}
              bg="white"
              color="#FF4500"
              borderRadius="5px"
              flex="1"
              py="2"
              fontSize={{ lg: "16px", base: "14px" }}
              fontWeight="medium"
              border="1px solid #FF4500"
              textAlign="center">
              Menus
            </Tab>
            <Tab
              _selected={{ bg: "#FF4500", color: "white" }}
              bg="white"
              color="#FF4500"
              borderRadius="5px"
              flex="1"
              py="2"
              fontSize={{ lg: "16px", base: "14px" }}
              fontWeight="medium"
              border="1px solid #FF4500"
              textAlign="center">
              Menu Options
            </Tab>
            <Tab
              _selected={{ bg: "#FF4500", color: "white" }}
              bg="white"
              color="#FF4500"
              borderRadius="5px"
              flex="1"
              py="2"
              fontSize={{ lg: "16px", base: "14px" }}
              fontWeight="medium"
              border="1px solid #FF4500"
              textAlign="center">
              Options
            </Tab>
            <Tab
              _selected={{ bg: "#FF4500", color: "white" }}
              bg="white"
              color="#FF4500"
              borderRadius="5px"
              flex="1"
              py="2"
              fontSize={{ lg: "16px", base: "14px" }}
              fontWeight="medium"
              border="1px solid #FF4500"
              textAlign="center">
              Packs
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              {isMenuLoading ? (
                <MenuListSkeleton />
              ) : (
                <MenuList
                  categories={categoryList}
                  collections={collectionList}
                  menus={menuList}
                />
              )}
            </TabPanel>

            <TabPanel p={0}>
              {isMenuOptionLoading ? (
                <MenuOptionListSkeleton />
              ) : (
                <MenuOptionList
                  options={optionList}
                  menuOptions={menuOptionList}
                />
              )}
            </TabPanel>

            <TabPanel p={0}>
              {isOptionLoading ? (
                <OptionSkeleton />
              ) : (
                <OptionList options={optionList} />
              )}
            </TabPanel>

            <TabPanel p={0}>
              {isPackLoading ? (
                <OptionSkeleton />
              ) : (
                <PackList options={packList} />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Wrapper>
  );
}
