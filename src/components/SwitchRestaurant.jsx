import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Avatar,
  Box,
  Text,
  HStack,
  VStack,
  Button,
  Switch,
  Spinner,
} from "@chakra-ui/react";
import useGet from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
import { url } from "../utils/lib";
import { useRestaurant } from "../context/restaurant";
import { toast } from "react-toastify";

const SwitchRestaurant = ({ isOpen, onClose }) => {
  const [selected, setSelected] = useState("");

  const { selectRestaurant, activeRestaurant } = useRestaurant();

  const { data, isPending } = useGet(
    `${url}/v1/restaurant/vendor`,
    `restaurant-list`
  );

  const list = data?.data;

  function handleSuccess() {
    toast.success(
      `${selected?.name} ${selected?.isOpen ? "closed" : "opened"}`
    );
    if (selected?._id === activeRestaurant?._id) {
      selectRestaurant({
        ...activeRestaurant,
        isOpen: !activeRestaurant.isOpen,
      });
    }
  }

  const toggleHandler = usePost({
    url: `${url}/v1/restaurant/${selected?._id}/toggle`,
    queryKey: `restaurant-list`,
    title: "",
    onSuccess: handleSuccess,
  });

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={{ lg: "sm", base: "xs" }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Restaurants</DrawerHeader>

          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              {list?.map((restaurant) => (
                <Box
                  key={restaurant.id}
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center">
                  <HStack spacing={3}>
                    <Avatar
                      size="sm"
                      src={restaurant.image}
                      name={restaurant.name}
                    />
                    <Box>
                      <Text textTransform="capitalize" fontWeight="medium">
                        {restaurant.name}
                      </Text>
                      <HStack>
                        <Text
                          fontSize="sm"
                          color={
                            restaurant.status === "open"
                              ? "green.500"
                              : "red.500"
                          }>
                          {restaurant.isOpen ? "Open" : "Closed"}
                        </Text>
                        {toggleHandler.isPending &&
                        selected?._id === restaurant?._id ? (
                          <Spinner colorScheme="orange" size="sm" />
                        ) : (
                          <Switch
                            isChecked={restaurant?.isOpen}
                            onChange={() => {
                              setSelected(restaurant); // Set selected
                              toggleHandler.mutate({}); // Trigger the toggle API call
                            }}
                            colorScheme="orange"
                          />
                        )}
                      </HStack>
                    </Box>
                  </HStack>
                  <Button
                    size={{ lg: "sm", base: "xs" }}
                    colorScheme="orange"
                    bg="brand.100"
                    color="white"
                    onClick={() => {
                      selectRestaurant(restaurant);
                      onClose();
                    }}>
                    Switch
                  </Button>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SwitchRestaurant;
