import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InputComponent from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/auth";
import { useRestaurant } from "../../context/restaurant";
import { toast } from "react-toastify";
import OneSignal from "react-onesignal";
import { usePost } from "../../hooks/usePost";
import { url } from "../../utils/lib";
import { getOneSignalId } from "../../utils/onesignal";
import AuthWrapper from "../../components/AuthWrapper";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const { user, login } = useAuth();
  const { selectRestaurant } = useRestaurant();
  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSuccess = async (data) => {
    toast.success("Welcome Back");

    if (data?.data?.restaurant) {
      selectRestaurant(data?.data?.restaurant);
      navigate(from, { replace: true });
    } else {
      // navigate to create restaurant page
      navigate("/onboarding");
    }

    login(data?.data?.user, data?.data?.token);
    reset();
    OneSignal.login(data?.data?.user?._id);
  };

  function handleError(error) {
    if (error?.statusCode === 403) navigate(`/verify?email=${email}`);
  }

  const loginHandler = usePost({
    url: `${url}/v1/auth/vendor/login`,
    queryKey: "",
    title: "Login Successful",
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = async (data) => {
    setEmail(data?.email);
    const onesignalId = getOneSignalId();

    loginHandler.mutate({
      ...data,
      playerId: onesignalId || "",
    });
  };

  useEffect(() => {
    reset({ email: user?.email || "" });
  }, [user, reset]);
  return (
    <AuthWrapper>
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
          isLoading={loginHandler.isPending}
          isDisabled={loginHandler.isPending}
          _hover={{ opacity: "90%", boxShadow: "lg" }}
          type="submit">
          Login
        </Button>
      </form>

      <Flex
        w="100%"
        align={{ lg: "center", base: "center" }}
        justify={{ lg: "space-between", base: "center" }}
        direction={{ lg: "row", base: "column" }}
        fontSize="sm"
        color="gray.600">
        <Link to="/forgot-password" style={{ color: "#FF4500" }}>
          Forgot Password?
        </Link>
        <Text>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#FF4500", fontWeight: "500" }}>
            Register
          </Link>
        </Text>
      </Flex>
    </AuthWrapper>
  );
}
