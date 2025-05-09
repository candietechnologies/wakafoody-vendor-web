import { Box, Button, Divider, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import ImageComponent from "../../components/Image";
import InputComponent from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Flex
      //   style={{ backgroundColor: "rgba(255, 69, 0, 0.025)" }}
      w="100%"
      align="center"
      justify="center"
      bg="#FF4500"
      h="100vh">
      <Flex
        p="1rem"
        align="center"
        justify="start"
        w="500px"
        bg="white"
        rounded="8px"
        boxShadow="lg"
        direction="column"
        gap="1rem">
        <Box w="100px">
          <ImageComponent src="/logo.png" alt="wakafoody logo" height="80px" />
        </Box>
        <Heading fontSize="20px" color="#111" fontWeight="semibold">
          Continue the Experience
        </Heading>
        <Divider />
        <form className="w-full flex items-start flex-col gap-4">
          <InputComponent placeholder="example@gmail.com" label="Email" />
          <PasswordInput label="Password" />
          <Button
            w="100%"
            size="lg"
            fontSize="16px"
            bg="brand.100"
            color="#fff"
            _hover={{ opacity: "90%" }}>
            Login
          </Button>
        </form>
        <Link className="text-[#FF4500]" to="/forgot-password">
          Forgot Password?
        </Link>
      </Flex>
    </Flex>
  );
}
