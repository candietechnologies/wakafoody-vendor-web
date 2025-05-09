import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  FormHelperText,
} from "@chakra-ui/react";

export default function CustomInput({
  type,
  value,
  // onChange,
  focusBorderColor,
  placeholder,
  readOnly,
  label,
  icon,
  info,
  register,
  name,
  ...props
}) {
  return (
    <FormControl>
      {label && (
        <FormLabel fontSize={{ lg: 16, md: 15, base: 15 }}>{label}</FormLabel>
      )}
      <InputGroup borderRadius="8px" border="none" bg="#FFF0E6">
        {icon && (
          <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
        )}
        <Input
          type={type}
          style={{ fontFamily: "Poppins" }}
          value={value}
          fontSize={{ lg: 16, md: 16, base: 16 }}
          _placeholder={{ fontSize: { lg: 16, md: 15, base: 12 } }}
          focusBorderColor={focusBorderColor || "brand.100"}
          placeholder={placeholder}
          readOnly={readOnly}
          border="none"
          {...props}
          {...(register && name ? register(name) : {})} // Only apply register if provided
        />
      </InputGroup>
      {info && (
        <FormHelperText color="red" fontSize="12px">
          {info}
        </FormHelperText>
      )}
    </FormControl>
  );
}
