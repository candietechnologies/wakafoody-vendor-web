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
  useToast,
} from "@chakra-ui/react";
import InputComponent from "./Input";

const AddOption = ({ onAdd, isOpen, onClose }) => {
  const [collectionName, setCollectionName] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    if (!collectionName.trim()) {
      toast({
        title: "Collection name is required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onAdd(collectionName.trim());
    setCollectionName("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Option</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputComponent
            label="Name"
            placeholder="e.g., chicken, egg"
            value={collectionName}
          />
          <InputComponent
            label="Price"
            placeholder="1,500"
            value={collectionName}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="orange" variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            bg="brand.100"
            color="#fff"
            colorScheme="teal"
            onClick={handleSubmit}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddOption;
