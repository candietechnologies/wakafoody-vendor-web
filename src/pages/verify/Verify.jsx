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

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const email = getQueryVariable("email") || "";
  const navigate = useNavigate();
  const { login } = useAuth();

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
    toast.success("Email verification successful");
    setOtp("");
    setTimer(30);

    login(data?.data?.user, data?.data?.token);
    navigate("/onboarding");
    OneSignal.login(data?.data?.user?._id);
  }

  const verifyHandler = usePost({
    url: `${url}/v1/auth/vendor/verify`,
    queryKey: "",
    title: "Email verification successful",
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
    resendHandler.mutate({ email, type: "verify email" });
  }

  const handleSubmit = () => {
    if (otp.length !== 4) {
      toast.warn("Please enter a valid 4-digit code.");
      return;
    }
    if (!email) return toast.warn("Email is required");
    verifyHandler.mutate({ email, token: otp, type: "verify email" });
  };

  return (
    <AuthWrapper title="Verify Email" text={`Enter OTP sent to ${email || ""}`}>
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

        <Button
          colorScheme="orange"
          bg="brand.100"
          color="white"
          w="40%"
          isLoading={verifyHandler.isPending}
          isDisabled={verifyHandler.isPending}
          onClick={handleSubmit}>
          Continue
        </Button>

        <Button
          isDisabled={resendHandler.isPending || timer > 0}
          isLoading={resendHandler.isPending}
          onClick={handleResend}
          variant="ghost"
          color="brand.100"
          colorScheme="orange">
          {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
        </Button>
      </Flex>
    </AuthWrapper>
  );
}
