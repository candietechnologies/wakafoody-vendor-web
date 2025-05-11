import { z } from "zod";
import useGet from "../../hooks/useGet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "../../hooks/usePost";
import InputComponent from "../../components/Input";
import CustomSelect from "../../components/CustomSelect";
import { toast } from "react-toastify";
import { url } from "../../utils/lib";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useRestaurant } from "../../context/restaurant";

const schema = z.object({
  accountName: z.string().min(1, { message: "Account name is required" }),
  accountNumber: z.string().min(1, { message: "Account number is required" }),
});

export default function AddPayoutInfo() {
  const navigate = useNavigate();
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
    navigate("/");
  };

  const payoutHandler = usePost({
    url: `${url}/v1/payment-information`,
    title: "Payout account added",
    queryKey: "",
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
    <form
      className="w-full flex flex-col items-start gap-4"
      onSubmit={handleSubmit(onSubmit)}>
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
        <p className="text-red-500 text-sm">{errors.accountNumber.message}</p>
      )}

      <InputComponent
        register={register}
        name="accountName"
        label="Account Name"
        placeholder="waka kitchen"
      />
      {errors.accountName && (
        <p className="text-red-500 text-sm">{errors.accountName.message}</p>
      )}

      <Button
        isLoading={payoutHandler.isPending}
        isDisabled={payoutHandler.isPending}
        w="100%"
        bg="brand.100"
        color="#fff"
        colorScheme="orange"
        type="submit">
        Complete
      </Button>
    </form>
  );
}
