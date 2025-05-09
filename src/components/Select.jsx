import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

export default function SelectComponent({
  label,
  onChange,
  placeholder,
  options = [],
  value,
  register = () => {},
  name,
  customOption = [],
}) {
  return (
    <FormControl>
      <FormLabel fontSize={{ lg: 16, md: 15, base: 12 }}>{label}</FormLabel>
      <Select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        focusBorderColor="brand.100"
        placeholder={placeholder}
        bg="#FFF0E6"
        border="none"
        {...register(name)}
        fontSize={{ lg: 16, md: 16, base: 16 }}
        _placeholder={{ fontSize: { lg: 16, md: 15, base: 12 } }}>
        {customOption.length === 0 ? (
          <>
            {options?.map((el, i) => (
              <option className="option" key={i} value={el}>
                {el}
              </option>
            ))}
          </>
        ) : (
          <>
            {customOption?.map((el, i) => (
              <option className="option" key={i} value={el.value}>
                {el.name}
              </option>
            ))}
          </>
        )}
      </Select>
    </FormControl>
  );
}
