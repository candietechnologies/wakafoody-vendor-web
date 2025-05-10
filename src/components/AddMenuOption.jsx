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
  useDisclosure,
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

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

const AddMenuOptionModal = ({ options, restaurantId, isOpen, onClose }) => {
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

  const menuOptionHandler = usePost({
    url: `${url}/v1/menu-options`,
    queryKey: `menu-option-${restaurantId}`,
    title: "Menu option Added",
    onSuccess: handleSuccess,
  });

  const onSubmit = (data) => {
    if (option.length === 0) return toast.warn("Select options");
    menuOptionHandler.mutate({
      ...data,
      restaurant: restaurantId,
      options: option.map((el) => el.value),
    });
  };

  return (
    <>
      <AddOption isOpen={optionProps.isOpen} onClose={optionProps.onClose} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Menu Option</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputComponent
              register={register}
              name="name"
              label="Name"
              info={errors.name?.message ? errors.name.message : null}
              placeholder="E.G Protein"
            />

            <CustomSelect
              label="Options"
              options={options.map((el) => {
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
              isLoading={menuOptionHandler.isPending}
              isDisabled={menuOptionHandler.isPending}
              onClick={handleSubmit(onSubmit)}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMenuOptionModal;
