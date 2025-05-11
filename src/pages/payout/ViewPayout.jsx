import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
  Badge,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import amountFormatter from "../../utils/amount-formatter";
import { formatDate } from "../../utils/format-date";
import { formatTime } from "../../utils/formatTime";

const getStatusColor = (status) => {
  switch (status) {
    case "disbursed":
      return "green";
    case "pending":
      return "yellow";
    case "canceled":
      return "red";
    default:
      return "gray";
  }
};

const ViewPayout = ({ isOpen, onClose, payout }) => {
  const labelColor = useColorModeValue("gray.600", "gray.300");

  if (!payout) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ lg: "md", base: "sm" }}
      isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>View Payout</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack spacing={4}>
            <Box>
              <Text color={labelColor} fontSize="sm">
                Amount
              </Text>
              <Text fontWeight="semibold">
                ₦{amountFormatter(payout.amount)}
              </Text>
            </Box>

            <Box>
              <Text color={labelColor} fontSize="sm">
                Status
              </Text>
              <Badge colorScheme={getStatusColor(payout.status)}>
                {payout.status}
              </Badge>
            </Box>

            <Box>
              <Text color={labelColor} fontSize="sm">
                Request Date
              </Text>
              <Text>
                {formatDate(payout.createdAt)}, {formatTime(payout.createdAt)}
              </Text>
            </Box>

            {payout.status === "disbursed" && payout.disbursedDate && (
              <Box>
                <Text color={labelColor} fontSize="sm">
                  Disbursed Date
                </Text>
                <Text>
                  {formatDate(payout.disbursedDate)},{" "}
                  {formatTime(payout.disbursedDate)}
                </Text>
              </Box>
            )}

            {payout.status === "canceled" && payout.canceledDate && (
              <Box>
                <Text color={labelColor} fontSize="sm">
                  Canceled Date
                </Text>
                <Text>
                  {formatDate(payout.canceledDate)},{" "}
                  {formatTime(payout.canceledDate)}
                </Text>
              </Box>
            )}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewPayout;
