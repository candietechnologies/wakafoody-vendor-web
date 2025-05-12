import React, { useState } from "react";
import AuthWrapper from "../../components/AuthWrapper";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import { url } from "../../utils/lib";
import { getOneSignalId } from "../../utils/onesignal";
import InputComponent from "../../components/Input";
import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSuccess = async () => {
    toast.success("Welcome Back");
    navigate(`/reset-password?email=${email}`);
    reset();
  };

  const forgotHandler = usePost({
    url: `${url}/v1/auth/vendor/forgot-password`,
    queryKey: "",
    title: "Login Successful",
    onSuccess: handleSuccess,
  });

  const onSubmit = async (data) => {
    const onesignalId = getOneSignalId();

    setEmail(data.email);

    forgotHandler.mutate({
      ...data,
      playerId: onesignalId || "",
    });
  };

  return (
    <AuthWrapper
      title="Reset Password"
      text="Enter your email address to reset password">
      <form
        className="w-full flex flex-col items-start gap-4"
        onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          register={register}
          name="email"
          placeholder="example@gmail.com"
          label="Email"
          info={errors.email?.message ? errors.email.message : null}
        />

        <Button
          w="100%"
          size="lg"
          fontSize="16px"
          bg="brand.100"
          color="white"
          isLoading={forgotHandler.isPending}
          isDisabled={forgotHandler.isPending}
          _hover={{ opacity: "90%", boxShadow: "lg" }}
          type="submit">
          Continue
        </Button>
      </form>
      <Flex
        w="100%"
        align={{ lg: "center", base: "center" }}
        justify="center"
        direction={{ lg: "row", base: "column" }}
        fontSize="sm"
        color="gray.600">
        <Link to="/login" style={{ color: "#FF4500" }}>
          Back to login
        </Link>
      </Flex>
    </AuthWrapper>
  );
}
