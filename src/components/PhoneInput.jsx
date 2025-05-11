import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

export default function PhoneInput({ label, register, name, info, required }) {
  return (
    <FormControl isRequired={required}>
      <FormLabel fontWeight="medium" fontSize={{ lg: 15, md: 15, base: 14 }}>
        {label}
      </FormLabel>
      <InputGroup bg="#FFF0E6" borderRadius="0.5rem">
        <InputLeftAddon
          fontSize={{ lg: 15, md: 15, base: 14 }}
          _placeholder={{ fontSize: { lg: 16, md: 15, base: 12 } }}
          bg="transparent"
          children="+234"
          border="none"
        />
        <Input
          style={{ fontFamily: "Poppins" }}
          fontSize={{ lg: 15, md: 15, base: 14 }}
          _placeholder={{ fontSize: { lg: 16, md: 15, base: 12 } }}
          {...(register && name ? register(name) : {})}
          focusBorderColor="brand.100"
          placeholder="81X-XXX-XXXX"
          border="none"
          type="tel"
          maxLength={11}
        />
      </InputGroup>
      {info && (
        <FormHelperText fontSize="12px" color="red">
          {info}
        </FormHelperText>
      )}
    </FormControl>
  );
}
