import React, { useState, useEffect } from "react";
import AuthWrapper from "../../components/AuthWrapper";
import {
  Button,
  Flex,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { usePost } from "../../hooks/usePost";
import { url } from "../../utils/lib";
import { getQueryVariable } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import OneSignal from "react-onesignal";
import PasswordInput from "../../components/PasswordInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePatch } from "../../hooks/usePatch";

const schema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    passwordConfirm: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export default function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const email = getQueryVariable("email") || "";
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Countdown logic
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleComplete = (value) => {
    setOtp(value);
  };

  function handleSuccessResend() {
    toast.success("OTP Resent");
    setOtp("");
    setTimer(30);
  }

  function handleSuccess(data) {
    toast.success("Password reset successful");
    setOtp("");
    setTimer(30);

    login(data?.data?.user, data?.data?.token);
    OneSignal.login(data?.data?.user?._id);
    reset();
    logout();
    navigate("/login");
  }

  const resetHandler = usePatch({
    url: `${url}/v1/auth/vendor/reset-password`,
    queryKey: "",
    title: "Password reset successful",
    onSuccess: handleSuccess,
  });

  const resendHandler = usePost({
    url: `${url}/v1/auth/vendor/resend`,
    queryKey: "",
    title: "OTP resent",
    onSuccess: handleSuccessResend,
  });

  function handleResend() {
    if (!email) return toast.warn("Email is required");
    resendHandler.mutate({ email, type: "forgot password" });
  }

  const onSubmit = (data) => {
    if (otp.length !== 4) {
      toast.warn("Please enter a valid 4-digit code.");
      return;
    }
    if (!email) return toast.warn("Email is required");
    resetHandler.mutate({ ...data, email, otp, type: "forgot password" });
  };

  return (
    <AuthWrapper
      title="Reset Password Email"
      text={`Enter OTP sent to ${email || ""} and set new password`}>
      <form
        className="w-full flex flex-col items-start gap-4"
        onSubmit={handleSubmit(onSubmit)}>
        <Flex
          w="100%"
          align="center"
          justify="center"
          fontSize="sm"
          direction="column"
          gap="1rem"
          color="gray.600">
          <HStack justify="center">
            <PinInput
              focusBorderColor="brand.100"
              otp
              onComplete={handleComplete}>
              <PinInputField focusBorderColor="brand.100" />
              <PinInputField focusBorderColor="brand.100" />
              <PinInputField focusBorderColor="brand.100" />
              <PinInputField focusBorderColor="brand.100" />
            </PinInput>
          </HStack>

          <PasswordInput
            label="New Password"
            register={register}
            name="password"
            info={errors.password?.message ? errors.password.message : null}
          />
          <PasswordInput
            label="Confirm Password"
            name="passwordConfirm"
            register={register}
            info={
              errors.passwordConfirm?.message
                ? errors.passwordConfirm.message
                : null
            }
          />

          <Button
            colorScheme="orange"
            bg="brand.100"
            color="white"
            w="40%"
            isLoading={resetHandler.isPending}
            isDisabled={resetHandler.isPending}
            type="submit">
            Continue
          </Button>

          <Button
            isDisabled={resendHandler.isPending || timer > 0}
            isLoading={resendHandler.isPending}
            onClick={handleResend}
            variant="ghost"
            type="button"
            color="brand.100"
            colorScheme="orange">
            {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </Button>
        </Flex>
      </form>
    </AuthWrapper>
  );
}
