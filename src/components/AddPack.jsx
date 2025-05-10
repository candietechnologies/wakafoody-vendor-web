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
  name: z.string().min(1, { message: "Pack name is required" }),
  price: z.string().min(1, { message: "Pack price is required" }),
});

const AddPack = ({ isOpen, onClose, pack }) => {
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

  const handleSuccessUpdate = async () => {
    toast.success("Pack Updated");
    onClose();
    reset();
  };

  const packHandler = usePost({
    url: `${url}/v1/pack`,
    queryKey: `packs-${restaurantId}`,
    title: "Pack Added",
    onSuccess: handleSuccess,
  });

  const updateHandler = usePatch({
    url: `${url}/v1/pack/${pack?._id}?restaurant=${restaurantId}`,
    queryKey: `packs-${restaurantId}`,
    title: "Pack Updated",
    onSuccess: handleSuccessUpdate,
  });

  const onSubmit = (data) => {
    const payload = { ...data, restaurant: restaurantId };
    if (pack) return updateHandler.mutate(payload);
    packHandler.mutate(payload);
  };

  useEffect(() => {
    if (pack) {
      reset(pack);
    }
  }, [pack, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Pack</ModalHeader>
        <ModalCloseButton />
        <ModalBody gap="1rem">
          <Flex w="100%" align="start" gap="1rem" direction="column">
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
            isLoading={packHandler.isPending || updateHandler.isPending}
            isDisabled={packHandler.isPending || updateHandler.isPending}
            onClick={handleSubmit(onSubmit)}>
            {pack ? "Save" : "Add"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPack;
