import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import InputComponent from "./Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { usePost } from "../hooks/usePost";
import { useRestaurant } from "../context/restaurant";
import { url } from "../utils/lib";

const schema = z.object({
  name: z.string().min(1, { message: "Collection name is required" }),
});

const AddCollectionModal = ({ isOpen, onClose }) => {
  const { activeRestaurant } = useRestaurant();
  const restaurantId = activeRestaurant?._id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSuccess = async () => {
    toast.success("Collection Added");
    onClose();
    reset();
  };

  const collectionHandler = usePost({
    url: `${url}/v1/collection`,
    queryKey: `collection-${restaurantId}`,
    title: "Collection Added",
    onSuccess: handleSuccess,
  });

  const onSubmit = (data) => {
    collectionHandler.mutate({ ...data, restaurant: restaurantId });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputComponent
            label="Collection Name"
            placeholder="e.g., Breakfast Specials"
            register={register}
            name="name"
            info={errors.name?.message ? errors.name.message : null}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="orange" variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            bg="brand.100"
            color="#fff"
            colorScheme="orange"
            isLoading={collectionHandler.isPending}
            isDisabled={collectionHandler.isPending}
            onClick={handleSubmit(onSubmit)}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCollectionModal;
