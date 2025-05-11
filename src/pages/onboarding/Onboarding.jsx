import React from "react";
import {
  Box,
  Flex,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  useBreakpointValue,
} from "@chakra-ui/react";
import CreateRestaurant from "./CreateRestaurant";
import RestaurantOperations from "./OperationTimes";
import AddPayoutInfo from "./AddPayoutInfo";
import ImageComponent from "../../components/Image";

const steps = [
  { title: "Restaurant", description: "Create restaurant" },
  { title: "Operational Times", description: "Set working hours" },
  { title: "Payout Info", description: "Add bank details" },
];

export default function RestaurantSetupForm() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const isLastStep = activeStep === steps.length - 1;
  const isFirstStep = activeStep === 0;

  const handleNext = () => {
    if (!isLastStep) setActiveStep(activeStep + 1);
  };

  const stepDirection = useBreakpointValue({
    base: "vertical",
    md: "horizontal",
  });

  return (
    <Flex
      w="100%"
      align="center"
      justify="center"
      bgGradient="linear(to-r, orange.400, red.500)"
      minH="100vh"
      p={{ base: 4, md: 8 }}>
      <Box
        bg="white"
        p={{ base: 4, md: 6 }}
        w="100%"
        maxW="700px"
        borderRadius="md"
        boxShadow="md">
        <Box w="100px" mx="auto">
          <ImageComponent
            src="/logo.png"
            alt="wakafoody logo"
            fit="cover"
            height="80px"
          />
        </Box>
        <Stepper
          index={activeStep}
          size="md"
          colorScheme="orange"
          orientation={stepDirection}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        <Box mt={6}>
          {activeStep === 0 && (
            <CreateRestaurant
              isFirstStep={isFirstStep}
              handleNext={handleNext}
            />
          )}
          {activeStep === 1 && <RestaurantOperations handleNext={handleNext} />}
          {activeStep === 2 && <AddPayoutInfo />}
        </Box>
      </Box>
    </Flex>
  );
}
