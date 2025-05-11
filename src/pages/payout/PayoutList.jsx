import React, { Fragment, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Text,
  Badge,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import amountFormater from "../../utils/amount-formatter";
import { formatDate } from "../../utils/format-date";
import { formatTime } from "../../utils/formatTime";
import ViewPayout from "./ViewPayout";

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

const PayoutList = ({ list }) => {
  const [payout, setPayout] = useState("");
  const tableBg = useColorModeValue("gray.100", "gray.700");
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Fragment>
      <ViewPayout isOpen={isOpen} onClose={onClose} payout={payout} />
      <Box bg="white" w="100%" overflowX="auto">
        <Table variant="simple">
          <Thead bg={tableBg}>
            <Tr>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list?.length === 0 ? (
              <Tr>
                <Td colSpan={4}>
                  <Text textAlign="center" color="gray.500" py={4}>
                    No payouts available.
                  </Text>
                </Td>
              </Tr>
            ) : (
              list?.map((payout) => (
                <Tr key={payout.id}>
                  <Td>₦{amountFormater(payout.amount)}</Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(payout.status)}>
                      {payout.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Text>
                      {formatDate(payout.createdAt)}
                      {", "}
                      {formatTime(payout.createdAt)}
                    </Text>
                  </Td>
                  <Td>
                    <IconButton
                      icon={<ViewIcon />}
                      size="sm"
                      bg="brand.100"
                      color="white"
                      colorScheme="orange"
                      aria-label="View Payout"
                      onClick={() => {
                        setPayout(payout);
                        onOpen();
                      }}
                    />
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    </Fragment>
  );
};

export default PayoutList;
