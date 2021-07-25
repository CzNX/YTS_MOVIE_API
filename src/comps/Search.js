/* eslint-disable no-use-before-define */
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { top100Films } from "../assets/Searchdata";

const filter = createFilterOptions();

export default function Search({ value, setValue }) {
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            title: `Search "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={top100Films}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(option) => option.title}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="standard"
          placeholder="  Search..."
          className="search"
        />
      )}
    />
  );
}
