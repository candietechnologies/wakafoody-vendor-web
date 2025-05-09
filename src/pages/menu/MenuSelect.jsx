import React from "react";
import { FormControl, FormLabel, Select, Button } from "@chakra-ui/react";

const LabeledSelect = ({
  label,
  name,
  value,
  options,
  onChange,
  onAddNew,
  placeholder = "Select option",
  showAddNew = false,
}) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <Select
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </Select>
    {showAddNew && (
      <Button
        size="sm"
        mt={2}
        variant="ghost"
        colorScheme="blue"
        onClick={onAddNew}>
        + Add New {label}
      </Button>
    )}
  </FormControl>
);

export default LabeledSelect;
