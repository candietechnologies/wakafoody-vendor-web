import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  useToast,
  PinInput,
  PinInputField,
  HStack,
  Stack,
} from "@chakra-ui/react";
import amountFormatter from "../../utils/amount-formatter";
import { toast } from "react-toastify";
import { usePost } from "../../hooks/usePost";
import { url } from "../../utils/lib";

const RequestPayout = ({ isOpen, onClose, amount, restaurantId }) => {
  const [otp, setOtp] = useState("");

  const handleComplete = (value) => {
    setOtp(value);
  };

  function handleSuccess() {
    toast.success("Payout request successful");
    onClose();
    setOtp("");
  }

  const payoutHandler = usePost({
    url: `${url}/v1/payout/verify`,
    queryKey: `payouts-${restaurantId}`,
    title: "Payout request successful",
    onSuccess: handleSuccess,
  });

  const handleSubmit = () => {
    if (otp.length !== 4) {
      toast.warn("Please enter a valid 4-digit code.");
      return;
    }
    payoutHandler.mutate({ restaurant: restaurantId, otp });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ lg: "md", base: "sm" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Request Payout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Box>
              <Text fontSize="sm" color="gray.500">
                Payout Amount
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                ₦{amountFormatter(amount)}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500" mb={1}>
                Enter 4-digit OTP sent to your mail
              </Text>
              <HStack justify="center">
                <PinInput
                  focusBorderColor="brand.100"
                  otp
                  onComplete={handleComplete}>
                  <PinInputField focusBorderColor="brand.100" />
                  <PinInputField focusBorderColor="brand.100" />
                  <PinInputField focusBorderColor="brand.100" />
                  <PinInputField focusBorderColor="brand.100" />
                </PinInput>
              </HStack>
            </Box>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} variant="ghost" mr={3}>
            Cancel
          </Button>
          <Button
            colorScheme="orange"
            bg="brand.100"
            color="white"
            isLoading={payoutHandler.isPending}
            isDisabled={payoutHandler.isPending}
            onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RequestPayout;
