import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import CustomSelect from "../../components/CustomSelect";
import InputComponent from "../../components/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../../hooks/usePost";
import { url } from "../../utils/lib";
import { toast } from "react-toastify";
import { useRestaurant } from "../../context/restaurant";
import useGet from "../../hooks/useGet";

const schema = z.object({
  discount: z.coerce
    .number()
    .min(1, { message: "Discount is required" })
    .max(100, { message: "Discount cannot exceed 100" }),
});

const CreatePromotionModal = ({ isOpen, onClose }) => {
  const [menus, setMenus] = useState([]);
  const { activeRestaurant } = useRestaurant();
  const restaurantId = activeRestaurant?._id;

  const { data, isPending } = useGet(
    `${url}/v1/menu?restaurant=${restaurantId}`,
    "menus"
  );

  const list = data?.data?.filter((el) => !el.discount);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  function handleSuccess() {
    toast.success("Discount applied");
    reset();
    setMenus([]);
    onClose();
  }

  const createHandler = usePost({
    url: `${url}/v1/sponsored?restaurant=${restaurantId}`,
    queryKey: "sponsored",
    title: "Discount applied",
    onSuccess: handleSuccess,
  });

  const onSubmit = (data) => {
    if (menus.length === 0) return toast.warn("Select menu");

    createHandler.mutate({
      ...data,
      menu: menus.map((el) => el.value),
      restaurant: restaurantId,
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply Discounts</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex w="100%" align="start" direction="column" gap="1rem">
              {isPending && <Spinner />}
              <CustomSelect
                label="Select Menu"
                custom
                multiple
                onChange={(e) => setMenus(e)}
                value={menus}
                options={list?.map((el) => {
                  return {
                    label: `${el.name} - ${el?.price}`,
                    value: el?._id,
                  };
                })}
                visible={false}
              />

              <InputComponent
                label="Discount"
                placeholder="E.G, 7%"
                type="number"
                register={register}
                name="discount"
                info={errors.discount?.message ? errors.discount.message : null}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              isLoading={createHandler.isPending}
              isDisabled={createHandler.isPending}
              onClick={handleSubmit(onSubmit)}
              colorScheme="orange">
              Apply Discount
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePromotionModal;
