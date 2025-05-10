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
  name: z.string().min(1, { message: "Option name is required" }),
  price: z.string().min(1, { message: "Option price is required" }),
});

const AddOption = ({ isOpen, onClose }) => {
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

  const optionHandler = usePost({
    url: `${url}/v1/option`,
    queryKey: `menu-options-${restaurantId}`,
    title: "Option Added",
    onSuccess: handleSuccess,
  });

  const onSubmit = (data) => {
    optionHandler.mutate({ ...data, restaurant: restaurantId });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Option</ModalHeader>
        <ModalCloseButton />
        <ModalBody gap="1rem">
          <InputComponent
            label="Option Name"
            placeholder="e.g., Chicken"
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
            isLoading={optionHandler.isPending}
            isDisabled={optionHandler.isPending}
            onClick={handleSubmit(onSubmit)}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddOption;
