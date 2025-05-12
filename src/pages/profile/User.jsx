import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import InputComponent from "../../components/Input";
import PhoneInput from "../../components/PhoneInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/auth";
import { usePatch } from "../../hooks/usePatch";
import { url } from "../../utils/lib";
import { toast } from "react-toastify";
import { getOneSignalId } from "../../utils/onesignal";

const schema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }).trim(),
  lastName: z.string().min(1, { message: "Last Name is required" }).trim(),
  phone: z.string().min(1, { message: "Phone Number is required" }).trim(),
});

const User = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSuccess = async () => {
    toast.success("Profile Updated");
    reset();
  };

  const updateHandler = usePatch({
    url: `${url}/v1/vendor`,
    queryKey: "",
    title: "Profile Updated",
    onSuccess: handleSuccess,
  });

  const onSubmit = async (data) => {
    const onesignalId = getOneSignalId();

    updateHandler.mutate({
      ...data,
      playerId: onesignalId || "",
    });
  };

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  return (
    <Flex justify="center" align="center" py={10} px={{ lg: 4, basse: 2 }}>
      <Box
        bg="white"
        p={{ lg: 4, base: 4 }}
        rounded="md"
        shadow="md"
        w="full"
        maxW="500px"
        mx="auto">
        <Heading size="md" mb={6}>
          Profile Information
        </Heading>
        <form
          className="w-full flex flex-col items-start gap-4"
          onSubmit={handleSubmit(onSubmit)}>
          <Stack w="100%" spacing={4}>
            <InputComponent
              register={register}
              name="firstName"
              placeholder="Mr"
              label="First Name"
              info={errors.firstName?.message ? errors.firstName.message : null}
            />
            <InputComponent
              register={register}
              name="lastName"
              placeholder="candie"
              label="Last Name"
              info={errors.lastName?.message ? errors.lastName.message : null}
            />
            <PhoneInput register={register} name="phone" label="Phone Number" />

            <InputComponent
              value={user?.email}
              name="email"
              readOnly={true}
              label="Email"
            />

            <Button
              bg="brand.100"
              color="white"
              type="submit"
              isLoading={updateHandler.isPending}
              isDisabled={updateHandler.isPending}
              mt={4}
              colorScheme="orange">
              Save Changes
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default User;
