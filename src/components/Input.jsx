import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";

export default function InputComponent({
  label,
  type,
  placeholder,
  value,
  focusBorderColor,
  readOnly = false,
  info,
  required = false,
  register,
  name,
  inputType = "input",
}) {
  return (
    <FormControl isRequired={required}>
      <FormLabel fontWeight="medium" fontSize={{ lg: 15, md: 15, base: 14 }}>
        {label}
      </FormLabel>
      {inputType === "input" && (
        <Input
          type={type}
          style={{ fontFamily: "Poppins" }}
          value={value}
          fontSize={{ lg: 16, md: 16, base: 16 }}
          _placeholder={{ fontSize: { lg: 16, md: 15, base: 12 } }}
          focusBorderColor={focusBorderColor ? focusBorderColor : "#FF4500"}
          placeholder={placeholder}
          readOnly={readOnly}
          isRequired={required}
          bg="#FFF0E6"
          border="none"
          {...(register && name ? register(name) : {})}
        />
      )}
      {inputType === "textarea" && (
        <Textarea
          style={{ fontFamily: "Poppins" }}
          value={value}
          fontSize={{ lg: 16, md: 16, base: 16 }}
          _placeholder={{ fontSize: { lg: 16, md: 15, base: 12 } }}
          focusBorderColor={focusBorderColor ? focusBorderColor : "#FF4500"}
          placeholder={placeholder}
          readOnly={readOnly}
          isRequired={required}
          bg="#FFF0E6"
          border="none"
          {...(register && name ? register(name) : {})}
        />
      )}
      {info && (
        <FormHelperText color="red" fontSize="12px">
          {info}
        </FormHelperText>
      )}
    </FormControl>
  );
}
