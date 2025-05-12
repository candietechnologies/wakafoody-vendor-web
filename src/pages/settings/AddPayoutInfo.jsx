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
  Spinner,
} from "@chakra-ui/react";
import InputComponent from "../../components/Input";
import CustomSelect from "../../components/CustomSelect";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useGet from "../../hooks/useGet";
import { useRestaurant } from "../../context/restaurant";
import { url } from "../../utils/lib";
import { usePost } from "../../hooks/usePost";
import { z } from "zod";

const schema = z.object({
  accountName: z.string().min(1, { message: "Account name is required" }),
  accountNumber: z.string().min(1, { message: "Account number is required" }),
});

const AddPayoutModal = ({ isOpen, onClose }) => {
  const { activeRestaurant } = useRestaurant();

  const [bank, setBank] = useState("");

  const { data, isPending } = useGet(
    `${url}/v1/payment-information/banks`,
    "banks"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSuccess = () => {
    toast.success("Payout information added");
  };

  const payoutHandler = usePost({
    url: `${url}/v1/payment-information`,
    title: "Payout account added",
    queryKey: "payout info",
    onSuccess: handleSuccess,
  });

  const onSubmit = (val) => {
    if (!bank) return toast.warn("Select bank");
    const payload = {
      bankName: bank.label,
      bankCode: bank.value,
      accountName: val?.accountName,
      accountNumber: val?.accountNumber,
      restaurantId: activeRestaurant?.id,
    };
    payoutHandler.mutate(payload);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Payout Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form className="w-full flex flex-col items-start gap-4">
              {isPending && <Spinner />}
              <CustomSelect
                label="Select Bank"
                value={bank}
                onChange={(e) => setBank(e)}
                visible={false}
                custom
                options={data?.data?.map((el) => {
                  return {
                    label: el.name,
                    value: el.code,
                  };
                })}
              />

              <InputComponent
                register={register}
                name="accountNumber"
                label="Account Number"
                placeholder="0123456789"
                type="tel"
                maxLength={10}
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-sm">
                  {errors.accountNumber.message}
                </p>
              )}

              <InputComponent
                register={register}
                name="accountName"
                label="Account Name"
                placeholder="waka kitchen"
              />
              {errors.accountName && (
                <p className="text-red-500 text-sm">
                  {errors.accountName.message}
                </p>
              )}
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              isLoading={payoutHandler.isPending}
              isDisabled={payoutHandler.isPending}
              bg="brand.100"
              color="#fff"
              colorScheme="orange"
              onClick={handleSubmit(onSubmit)}>
              Complete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPayoutModal;
