import React, { useState } from "react";
import AuthWrapper from "../../components/AuthWrapper";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import { toast } from "react-toastify";
import { usePost } from "../../hooks/usePost";
import { url } from "../../utils/lib";
import { getOneSignalId } from "../../utils/onesignal";
import PhoneInput from "../../components/PhoneInput";

const schema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }).trim(),
  lastName: z.string().min(1, { message: "Last Name is required" }).trim(),
  phone: z.string().min(1, { message: "Phone Number is required" }).trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Register() {
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
    toast.success("Signup Successful");
    navigate(`/verify?email=${email}`);
    reset();
  };

  const registerHandler = usePost({
    url: `${url}/v1/auth/vendor/signup`,
    queryKey: "",
    title: "Signup Successful",
    onSuccess: handleSuccess,
  });

  const onSubmit = async (data) => {
    const onesignalId = getOneSignalId();
    setEmail(data.email);

    registerHandler.mutate({
      ...data,
      playerId: onesignalId || "",
    });
  };

  return (
    <AuthWrapper title="Welcome to WakaFoody" text="Register your restaurant">
      <Flex
        w="100%"
        align="center"
        justify="center"
        fontSize="sm"
        direction="column"
        color="gray.600">
        <form
          className="w-full flex flex-col items-start gap-4"
          onSubmit={handleSubmit(onSubmit)}>
          <Flex w="100%" align="center" gap="1rem">
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
          </Flex>
          <PhoneInput register={register} name="phone" label="Phone Number" />
          <InputComponent
            register={register}
            name="email"
            placeholder="candie@gmail.com"
            label="Email"
            info={errors.email?.message ? errors.email.message : null}
          />
          <PasswordInput
            register={register}
            name="password"
            label="Password"
            info={errors.password?.message ? errors.password.message : null}
          />
          <Button
            w="100%"
            size="lg"
            fontSize="16px"
            bg="brand.100"
            color="white"
            isLoading={registerHandler.isPending}
            isDisabled={registerHandler.isPending}
            _hover={{ opacity: "90%", boxShadow: "lg" }}
            type="submit">
            Login
          </Button>
        </form>

        <Text>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#FF4500", fontWeight: "500" }}>
            Login
          </Link>
        </Text>
      </Flex>
    </AuthWrapper>
  );
}
