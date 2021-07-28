import TextField from "@material-ui/core/TextField";

export default function Search({ value, setValue }) {
  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      variant="standard"
      placeholder="  Search..."
      className="search"
    />
  );
}
