import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import CustomSelect from "./CustomSelect";
import InputComponent from "./Input";

const AddMenuOptionModal = ({
  existingOptions = [],
  onAdd,
  isOpen,
  onClose,
}) => {
  const [optionName, setOptionName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    if (!optionName.trim() || !selectedOption) {
      toast({
        title: "Both fields are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onAdd({
      name: optionName.trim(),
      base: selectedOption,
    });

    setOptionName("");
    setSelectedOption("");
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Menu Option</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputComponent label="Name" />

            <CustomSelect label="Options" options={[]} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="orange"
              variant="ghost"
              mr={3}
              onClick={onClose}>
              Cancel
            </Button>
            <Button bg="brand.100" color="#fff" onClick={handleSubmit}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMenuOptionModal;
