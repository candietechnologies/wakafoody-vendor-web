import React, { useEffect, useState } from "react";
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Menu,
  MenuButton,
  MenuList as MenuListComp,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
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
import AddCollectionModal from "../../components/AddCollection";
import AddOption from "../../components/AddOption";
import AddMenuOptionModal from "../../components/AddMenuOption";
import AddPack from "../../components/AddPack";

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

  // modal props
  const collectionModal = useDisclosure();
  const optionModal = useDisclosure();
  const meenuOptionsModal = useDisclosure();
  const packModal = useDisclosure();

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
      setMenuList(menuData?.data || []);
      setMenuOptionList(menuOptionData?.data || []);
      setOptionList(optionData?.data || []);
      setPackList(packData?.data || []);
      return;
    }

    const term = search?.trim().toLowerCase();
    const filterTerm = filter?.trim().toLowerCase();

    const filterByName = (list) =>
      list?.filter((el) => el.name?.toLowerCase().includes(term)) || [];
    const menus = menuData?.data || [];

    if (filterTerm) {
      setMenuList(
        menus?.filter((el) =>
          filterTerm === "available"
            ? el.inStock
            : filterTerm === "sold out"
            ? !el.inStock
            : el
        )
      );
    } else {
      setMenuList(
        menus?.filter(
          (el) =>
            el.name?.toLowerCase().includes(term) ||
            el.description?.toLowerCase().includes(term)
        ) || []
      );
      setMenuOptionList(filterByName(menuOptionData?.data || []));
      setOptionList(filterByName(optionData?.data || []));
      setPackList(filterByName(packData?.data || []));
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
      <AddPack isOpen={packModal.isOpen} onClose={packModal.onClose} />
      <AddMenuOptionModal
        isOpen={meenuOptionsModal.isOpen}
        onClose={meenuOptionsModal.onClose}
        options={optionData?.data || []}
      />
      <AddOption isOpen={optionModal.isOpen} onClose={optionModal.onClose} />
      <AddCollectionModal
        isOpen={collectionModal.isOpen}
        onClose={collectionModal.onClose}
      />
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
          component={
            <Menu>
              <MenuButton
                bg="brand.100"
                colorScheme="orange"
                color="#fff"
                as={Button}
                rightIcon={<ChevronDownIcon />}>
                Add
              </MenuButton>
              <MenuListComp>
                <MenuItem onClick={collectionModal.onOpen}>
                  Create Collection
                </MenuItem>
                <MenuItem onClick={optionModal.onOpen}>Create Option</MenuItem>
                <MenuItem onClick={meenuOptionsModal.onOpen}>
                  Create Menu Option
                </MenuItem>
                <MenuItem onClick={() => navigate("/menus/add")}>
                  Create Menu
                </MenuItem>
                <MenuItem onClick={packModal.onOpen}>Create Pack</MenuItem>
              </MenuListComp>
            </Menu>
          }
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
