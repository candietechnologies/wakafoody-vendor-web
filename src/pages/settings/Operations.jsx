import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  useColorModeValue,
  Container,
  Button,
  useDisclosure,
  Flex,
  Divider,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import AddPayoutModal from "./AddPayoutInfo";
import useGet from "../../hooks/useGet";
import { url } from "../../utils/lib";
import Spinner from "../../components/Spinner";
import { useRestaurant } from "../../context/restaurant";
import CustomSelect from "../../components/CustomSelect";
import { usePatch } from "../../hooks/usePatch";
import { toast } from "react-toastify";

const daysOfWeek = [
  { day: 1, label: "Monday" },
  { day: 2, label: "Tuesday" },
  { day: 3, label: "Wednesday" },
  { day: 4, label: "Thursday" },
  { day: 5, label: "Friday" },
  { day: 6, label: "Saturday" },
  { day: 7, label: "Sunday" },
];

const times = Array.from({ length: 48 }, (_, i) => {
  const hours = String(Math.floor(i / 2)).padStart(2, "0");
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});

const Operation = () => {
  const bg = useColorModeValue("white", "gray.700");

  const { activeRestaurant } = useRestaurant();
  const restaurantId = activeRestaurant?._id;

  const { data, isPending } = useGet(
    `${url}/v1/restaurant/${restaurantId}/operations`,
    `operations-${restaurantId}`
  );

  const operations = data?.data;

  const [hours, setHours] = useState([]);
  const [deliveryType, setDeliveryType] = useState({
    label: "Instant",
    value: "Instant",
  });
  const [preparationTime, setPreparationTime] = useState({
    value: "30",
    label: "30",
  });

  const deliveryOptions = ["Instant", "Order", "Express"];
  const preparationTimes = [5, 10, 15, 20, 30, 40, 45, 60];

  const operationHandler = usePatch({
    url: `${url}/v1/restaurant/${restaurantId}/operations`,
    queryKey: `operations-${restaurantId}`,
    title: "Restaurant operation added",
    onSuccess: () => {
      toast.success("Operations updated");
    },
  });

  const handleChange = (dayNumber, type, value) => {
    setHours((prev) =>
      prev.map((d) => (d.day === dayNumber ? { ...d, [type]: value } : d))
    );
  };

  const handleSave = () => {
    if (!deliveryType) return toast.warn("Select a delivery type");
    if (!preparationTime) return toast.warn("Select preparation time");

    operationHandler.mutate({
      operations: hours,
      deliveryType: deliveryType.value,
      preparationTime: preparationTime.value,
    });
  };

  useEffect(() => {
    setDeliveryType({
      label: activeRestaurant?.deliveryType,
      value: activeRestaurant?.deliveryType,
    });
    setPreparationTime({
      label: activeRestaurant?.preparationTime,
      value: activeRestaurant?.preparationTime,
    });
    if (!operations) {
      const defaultHours = daysOfWeek.map(({ day }) => ({
        day,
        open: "09:00",
        close: "20:00",
      }));
      setHours(defaultHours);
    } else {
      const formatedOperations = operations.map((el) => {
        return {
          day: el.day,
          open: el.open,
          close: el.close,
        };
      });
      setHours(formatedOperations);
    }
  }, [operations, activeRestaurant]);

  if (isPending) return <Spinner />;

  return (
    <Box
      p={6}
      mt={10}
      mx="auto"
      borderWidth={1}
      borderRadius="lg"
      bg={bg}
      boxShadow="sm"
      maxW="500px">
      <Flex direction="column" gap="1rem">
        <CustomSelect
          label="Delivery Type"
          name="deliveryType"
          value={deliveryType}
          options={deliveryOptions?.map((el) => {
            return { label: el, value: el };
          })}
          onChange={(e) => setDeliveryType(e)}
          visible={false}
          required={true}
          custom
        />

        <CustomSelect
          label="Preparation Time"
          name="preparationTime"
          value={preparationTime}
          options={preparationTimes?.map((el) => {
            return { label: el, value: el };
          })}
          onChange={(e) => setPreparationTime(e)}
          visible={false}
          required={true}
          custom
        />
        <Divider />
        <Box>
          <FormLabel
            fontWeight="normal"
            fontSize={{ lg: 14, md: 15, base: 13 }}>
            Restaurant Operating Hours
          </FormLabel>

          <Flex direction="column" gap={5} w="100%" spacing={5} align="stretch">
            {daysOfWeek.map(({ day, label }) => {
              const currentDay = hours.find((d) => d.day === day) || {
                open: "",
                close: "",
              };

              return (
                <Flex
                  w="100%"
                  key={day}
                  align={{ lg: "center", base: "start" }}
                  direction={{ lg: "row", base: "column" }}
                  gap={{ base: "0.4rem" }}
                  justify="space-between">
                  <Text fontSize={{ lg: 14, md: 15, base: 13 }} w="100px">
                    {label}
                  </Text>
                  <Flex flex="1" align="center" gap="1rem" justify="end">
                    <Select
                      placeholder="Open Time"
                      fontSize={{ lg: 14, md: 15, base: 13 }}
                      value={currentDay.open}
                      bg="#FFF0E6"
                      border="none"
                      textTransform="lowercase"
                      focusBorderColor={"#FF4500"}
                      onChange={(e) =>
                        handleChange(day, "open", e.target.value)
                      }
                      w="150px">
                      {times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </Select>
                    <Select
                      placeholder="Close Time"
                      fontSize={{ lg: 14, md: 15, base: 13 }}
                      value={currentDay.close}
                      bg="#FFF0E6"
                      border="none"
                      textTransform="lowercase"
                      focusBorderColor={"#FF4500"}
                      onChange={(e) =>
                        handleChange(day, "close", e.target.value)
                      }
                      w="150px">
                      {times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        </Box>

        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          w="100%"
          gap={4}>
          <Button
            bg="#FF4500"
            color="#fff"
            _hover={{ opacity: "90%" }}
            w="100%"
            isLoading={operationHandler.isPending}
            isDisabled={operationHandler.isPending}
            onClick={handleSave}>
            Continue
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Operation;
