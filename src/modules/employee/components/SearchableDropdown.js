import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const SearchableDropdown = ({ placeholder, options, onSelect, allowAddNew = false }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <Autocomplete
      freeSolo={allowAddNew}
      options={options}
      getOptionLabel={(option) => (typeof option === "string" ? option : option.label || "")}
      value={selectedValue}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        console.log("SearchableDropdown - Input changed:", newInputValue);
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        console.log("SearchableDropdown - Onchange selected value:", newValue);

        let finalValue = newValue;

        if (typeof newValue === "string" && newValue.trim() !== "") {
          console.log("SearchableDropdown - Adding new value:", newValue);
          onSelect(newValue);
        } else if (newValue && newValue.inputValue) {
          finalValue = newValue.inputValue;
          console.log("SearchableDropdown - Manually entered value:", finalValue);
          onSelect(finalValue);
        } else if (newValue) {
          onSelect(newValue);
        }

        setSelectedValue(finalValue);
      }}
      onBlur={() => {
        if (inputValue.trim() !== "" && !options.includes(inputValue)) {
          console.log("SearchableDropdown onBlur - Adding new value:", inputValue);
          onSelect(inputValue);
          setSelectedValue(inputValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={!inputValue && !selectedValue ? placeholder : ""}
          InputLabelProps={{ shrink: false }}
        />
      )}
    />
  );
};

export default SearchableDropdown;
