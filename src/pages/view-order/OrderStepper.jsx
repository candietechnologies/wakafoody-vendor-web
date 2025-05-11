import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
  StepIcon,
  StepNumber,
  VStack,
  Text,
} from "@chakra-ui/react";
import { formatDate } from "../../utils/format-date";
import { formatTime } from "../../utils/formatTime";

const OrderStepper = ({ status, order }) => {
  const steps = [
    { title: "Paid", key: "paid" },
    { title: "Accepted", key: "accepted" },
    { title: "Pickup Accepted", key: "pickup accepted" },
    { title: "Picked Up", key: "picked up" },
    { title: "Delivered", key: "delivered" },
  ];

  const dates = {
    paid: order?.paymentDate || null,
    accepted: order?.acceptedDate || null,
    "picked up": order?.pickupAcceptedDate || order?.pickupDate || null,
    delivered: order?.deliveryDate || null,
    "pickup accepted": order?.pickupAcceptedDate || null,
  };

  const activeIndex = steps.findIndex((step) => step.key === status);

  return (
    <Stepper
      bg="white"
      p="1rem"
      rounded="7px"
      index={activeIndex + 1}
      size="sm"
      colorScheme="orange"
      orientation="vertical"
      gap="4">
      {steps.map((step) => (
        <Step key={step.key}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>
              <Text fontSize="sm" color="gray.500">
                {dates[step.key]
                  ? `${formatDate(dates[step.key])}, ${formatTime(
                      dates[step.key]
                    )}`
                  : "Pending"}
              </Text>
            </StepDescription>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default OrderStepper;
