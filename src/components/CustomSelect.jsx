import React from "react";
import { Button, FormControl, FormLabel } from "@chakra-ui/react";
import Select from "react-select";

export default function CustomSelect({
  label,
  onChange,
  options,
  value,
  multiple = false,
  required = true,
  custom = false,
  onClick,
  visible = true,
}) {
  const optionList = custom
    ? []
    : options?.map((el) => {
        return {
          value: el?.toLowerCase().includes("select") ? "" : el,
          label: el,
        };
      });

  // Custom styles for react-select
  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#FFF0E6",
      border: "none",
      boxShadow: "none", // remove focus shadow
      "&:hover": {
        border: "none",
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 10, // optional, to ensure it shows above modals or overlays
    }),
  };

  return (
    <FormControl isRequired={required}>
      <FormLabel fontWeight="normal" fontSize={{ lg: 14, md: 15, base: 13 }}>
        {label}
      </FormLabel>
      <Select
        options={custom ? options : optionList}
        isSearchable={true}
        isMulti={multiple}
        value={value}
        onChange={onChange}
        styles={customStyles}
      />
      {visible && (
        <Button
          size="sm"
          mt={2}
          variant="ghost"
          colorScheme="orange"
          onClick={onClick}>
          + Add New {label}
        </Button>
      )}
    </FormControl>
  );
}
