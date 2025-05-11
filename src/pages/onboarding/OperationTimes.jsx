import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Select,
  Text,
  Button,
  FormLabel,
  Divider,
} from "@chakra-ui/react";
import { usePatch } from "../../hooks/usePatch";
import { url } from "../../utils/lib";
import { toast } from "react-toastify";
import { useRestaurant } from "../../context/restaurant";
import CustomSelect from "../../components/CustomSelect";

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

export default function RestaurantOperations({ handleNext }) {
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

  const { activeRestaurant } = useRestaurant();

  const restaurantId = activeRestaurant?._id;

  const operationHandler = usePatch({
    url: `${url}/v1/restaurant/${restaurantId}/operations`,
    queryKey: "",
    title: "Restaurant operation added",
    onSuccess: () => {
      toast.success("Operations updated");
      handleNext();
    },
  });

  console.log(hours);

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
    const defaultHours = daysOfWeek.map(({ day }) => ({
      day,
      open: "09:00",
      close: "20:00",
    }));
    setHours(defaultHours);
  }, []);

  return (
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
        <FormLabel fontWeight="normal" fontSize={{ lg: 14, md: 15, base: 13 }}>
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
                    onChange={(e) => handleChange(day, "open", e.target.value)}
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
                    onChange={(e) => handleChange(day, "close", e.target.value)}
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
  );
}
