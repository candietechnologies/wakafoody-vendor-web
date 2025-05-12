import React, { Fragment, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import amountFormater from "../../utils/amount-formatter";
import { formatDate } from "../../utils/format-date";
import { formatTime } from "../../utils/formatTime";
import AddOption from "../../components/AddOption";

const OptionList = ({ options = [] }) => {
  const [option, setOption] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Fragment>
      <AddOption isOpen={isOpen} onClose={onClose} option={option} />
      <Box
        overflowX="scroll"
        w="100%"
        bg="white"
        borderRadius="md"
        boxShadow="md">
        <Table variant="simple">
          <Thead bg={useColorModeValue("gray.100", "gray.700")}>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Price (₦)</Th>
              <Th>Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {options?.length === 0 ? (
              <Tr>
                <Td colSpan={3}>
                  <Text textAlign="center" color="gray.500">
                    No options found.
                  </Text>
                </Td>
              </Tr>
            ) : (
              options?.map((opt, idx) => (
                <Tr key={idx}>
                  <Td
                    fontSize={{ lg: "14px", base: "13px" }}
                    textTransform="capitalize">
                    {opt.name}
                  </Td>
                  <Td fontSize={{ lg: "14px", base: "13px" }} isNumeric>
                    ₦{amountFormater(opt.price || 0)}
                  </Td>
                  <Td fontSize={{ lg: "14px", base: "13px" }}>
                    {formatDate(opt.createdAt)}, {formatTime(opt.createdAt)}
                  </Td>
                  <Td>
                    <Button
                      size={{ lg: "sm", base: "xs" }}
                      colorScheme="orange"
                      onClick={() => {
                        setOption(opt);
                        onOpen();
                      }}>
                      Edit
                    </Button>
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

export default OptionList;
