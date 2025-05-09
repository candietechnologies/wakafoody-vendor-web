import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export default function PasswordInput({ label, value, register, name, info }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl>
      <FormLabel fontSize={{ lg: 16, md: 15, base: 12 }}>{label}</FormLabel>
      <InputGroup border="none" bg="#FFF0E6" size="md">
        <Input
          value={value}
          pr="4.5rem"
          style={{ fontFamily: "Poppins" }}
          focusBorderColor="brand.100"
          fontSize={{ lg: 16, md: 16, base: 16 }}
          _placeholder={{ fontSize: { lg: 16, md: 15, base: 12 } }}
          border="none"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          {...(register && name ? register(name) : {})} // Only apply register if provided
        />

        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {!show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {info && (
        <FormHelperText color="red" fontSize="12px">
          {info}
        </FormHelperText>
      )}
    </FormControl>
  );
}
