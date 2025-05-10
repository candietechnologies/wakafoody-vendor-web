import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
} from "@chakra-ui/react";
import InputComponent from "./Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { usePost } from "../hooks/usePost";
import { useRestaurant } from "../context/restaurant";
import { url } from "../utils/lib";
import { usePatch } from "../hooks/usePatch";

const schema = z.object({
  name: z.string().min(1, { message: "Option name is required" }),
  price: z.string().min(1, { message: "Option price is required" }),
});

const AddOption = ({ isOpen, onClose, option }) => {
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
    toast.success("Option Added");
    onClose();
    reset();
  };

  const handleSuccessUpdate = async () => {
    toast.success("Option Updated");
    onClose();
    reset();
  };

  const optionHandler = usePost({
    url: `${url}/v1/option`,
    queryKey: `menu-options-${restaurantId}`,
    title: "Option Added",
    onSuccess: handleSuccess,
  });

  const updateHandler = usePatch({
    url: `${url}/v1/option/${option?._id}?restaurant=${restaurantId}`,
    queryKey: `options-${restaurantId}`,
    title: "Option Updated",
    onSuccess: handleSuccessUpdate,
  });

  const onSubmit = (data) => {
    const payload = { ...data, restaurant: restaurantId };
    if (option) return updateHandler.mutate(payload);
    optionHandler.mutate(payload);
  };

  useEffect(() => {
    if (option) {
      reset(option);
    }
  }, [option, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Option</ModalHeader>
        <ModalCloseButton />
        <ModalBody gap="1rem">
          <Flex w="100%" align="start" gap="1rem" direction="column">
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
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="orange" variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            bg="brand.100"
            color="#fff"
            colorScheme="orange"
            isLoading={optionHandler.isPending || updateHandler.isPending}
            isDisabled={optionHandler.isPending || updateHandler.isPending}
            onClick={handleSubmit(onSubmit)}>
            {option ? "Save" : "Add"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddOption;
