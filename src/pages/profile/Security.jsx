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
import PasswordInput from "../../components/PasswordInput";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .trim(),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .trim(),
    passwordConfirm: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .trim(),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: "New passwords do not match",
    path: ["passwordConfirm"],
  });

const Security = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSuccess = async () => {
    toast.success("Password Updated");
    reset();
    logout();
    navigate("/login");
  };

  const updateHandler = usePatch({
    url: `${url}/v1/vendor/change-password`,
    queryKey: "",
    title: "Password Updated",
    onSuccess: handleSuccess,
  });

  const onSubmit = async (data) => {
    const onesignalId = getOneSignalId();

    updateHandler.mutate({
      ...data,
      playerId: onesignalId || "",
    });
  };

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
          Change Password
        </Heading>
        <form
          className="w-full flex flex-col items-start gap-4"
          onSubmit={handleSubmit(onSubmit)}>
          <Stack w="100%" spacing={4}>
            <PasswordInput
              register={register}
              name="oldPassword"
              label="Old Password"
              info={
                errors.oldPassword?.message ? errors.oldPassword.message : null
              }
            />
            <PasswordInput
              register={register}
              name="newPassword"
              label="New Password"
              info={
                errors.newPassword?.message ? errors.newPassword.message : null
              }
            />
            <PasswordInput
              register={register}
              name="passwordConfirm"
              label="Confirm Password"
              info={
                errors.passwordConfirm?.message
                  ? errors.passwordConfirm.message
                  : null
              }
            />

            <Button
              bg="brand.100"
              color="white"
              type="submit"
              isLoading={updateHandler.isPending}
              isDisabled={updateHandler.isPending}
              mt={4}
              colorScheme="orange">
              Change Password
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Security;
