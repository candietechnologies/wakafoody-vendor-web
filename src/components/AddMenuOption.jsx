import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import CustomSelect from "./CustomSelect";
import InputComponent from "./Input";
import AddOption from "./AddOption";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePost } from "../hooks/usePost";
import { url } from "../utils/lib";
import { toast } from "react-toastify";
import { usePatch } from "../hooks/usePatch";
import { useRestaurant } from "../context/restaurant";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

const AddMenuOptionModal = ({ options, isOpen, onClose, selectedOption }) => {
  const { activeRestaurant } = useRestaurant();
  const restaurantId = activeRestaurant?._id;

  const [option, setOption] = useState([]);
  const optionProps = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSuccess = async () => {
    toast.success("Menu option Added");
    onClose();
    reset();
    setOption([]);
  };

  const handleSuccessUpdate = async () => {
    toast.success("Menu option Updated");
    onClose();
    reset();
  };

  const menuOptionHandler = usePost({
    url: `${url}/v1/menu-options`,
    queryKey: `menu-option-${restaurantId}`,
    title: "Menu option Added",
    onSuccess: handleSuccess,
  });

  const updateHandler = usePatch({
    url: `${url}/v1/menu-options/${selectedOption?._id}?restaurant=${restaurantId}`,
    queryKey: `menu-options-${restaurantId}`,
    title: "Option Updated",
    onSuccess: handleSuccessUpdate,
  });

  const onSubmit = (data) => {
    if (option.length === 0) return toast.warn("Select options");

    if (selectedOption) {
      updateHandler.mutate({
        ...data,
        restaurant: restaurantId,
        options: option.map((el) => el.value),
      });

      return;
    }
    menuOptionHandler.mutate({
      ...data,
      restaurant: restaurantId,
      options: option.map((el) => el.value),
    });
  };

  useEffect(() => {
    if (selectedOption) {
      reset(selectedOption);
      setOption(
        selectedOption?.options?.map((el) => {
          return {
            label: el.name,
            value: el._id,
          };
        })
      );
    }
  }, [selectedOption, reset]);

  return (
    <>
      <AddOption isOpen={optionProps.isOpen} onClose={optionProps.onClose} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Menu Option</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex w="100%" align="start" gap="1rem" direction="column">
              <InputComponent
                register={register}
                name="name"
                label="Name"
                info={errors.name?.message ? errors.name.message : null}
                placeholder="E.G Protein"
              />

              <CustomSelect
                label="Options"
                options={options?.map((el) => {
                  return {
                    label: `${el.name} (${el.price})`,
                    value: el._id,
                  };
                })}
                visible={true}
                onChange={(e) => setOption(e)}
                value={option}
                onClick={optionProps.onOpen}
                custom
                multiple
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="orange"
              variant="ghost"
              mr={3}
              onClick={onClose}>
              Cancel
            </Button>
            <Button
              bg="brand.100"
              color="#fff"
              colorScheme="orange"
              isLoading={menuOptionHandler.isPending || updateHandler.isPending}
              isDisabled={
                menuOptionHandler.isPending || updateHandler.isPending
              }
              onClick={handleSubmit(onSubmit)}>
              {selectedOption ? "Save" : "Add"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMenuOptionModal;
