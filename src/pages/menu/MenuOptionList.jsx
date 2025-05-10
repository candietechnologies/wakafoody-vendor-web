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
import { formatTime } from "../../utils/formatTime";
import { formatDate } from "../../utils/format-date";
import AddMenuOptionModal from "../../components/AddMenuOption";

const MenuOptionList = ({ menuOptions = [], options }) => {
  const [option, setOption] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Fragment>
      <AddMenuOptionModal
        selectedOption={option}
        isOpen={isOpen}
        onClose={onClose}
        options={options}
      />
      <Box
        overflowX="scroll"
        w="100%"
        bg="white"
        borderRadius="md"
        boxShadow="md">
        <Table w="100%" variant="simple">
          <Thead bg={useColorModeValue("gray.100", "gray.700")}>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Number of Choices</Th>
              <Th>Date Created</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {menuOptions?.length === 0 ? (
              <Tr>
                <Td colSpan={3}>
                  <Text textAlign="center" color="gray.500">
                    No menu options available.
                  </Text>
                </Td>
              </Tr>
            ) : (
              menuOptions?.map((opt, idx) => (
                <Tr key={idx}>
                  <Td textTransform="capitalize">{opt.name}</Td>
                  <Td textAlign="center" isNumeric>
                    {opt?.options?.length}
                  </Td>
                  <Td>
                    {formatDate(opt.createdAt)}, {formatTime(opt.createdAt)}
                  </Td>
                  <Td>
                    <Button
                      size="sm"
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

export default MenuOptionList;
