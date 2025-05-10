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
  name: z.string().min(1, { message: "Pack name is required" }),
  price: z.string().min(1, { message: "Pack price is required" }),
});

const AddPack = ({ isOpen, onClose }) => {
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
    toast.success("Pack Added");
    onClose();
    reset();
  };

  const packHandler = usePost({
    url: `${url}/v1/pack`,
    queryKey: `packs-${restaurantId}`,
    title: "Pack Added",
    onSuccess: handleSuccess,
  });

  const onSubmit = (data) => {
    packHandler.mutate({ ...data, restaurant: restaurantId });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Pack</ModalHeader>
        <ModalCloseButton />
        <ModalBody gap="1rem">
          <InputComponent
            label="Pack Name"
            placeholder="e.g., Takeaway"
            register={register}
            name="name"
            info={errors.name?.message ? errors.name.message : null}
          />
          <InputComponent
            label="Price"
            placeholder="1,500"
            register={register}
            name="price"
            info={errors.price?.message ? errors.price.message : null}
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
            isLoading={packHandler.isPending}
            isDisabled={packHandler.isPending}
            onClick={handleSubmit(onSubmit)}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPack;
