import { TextField, Autocomplete, MenuItem } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
  label: string,
  placeholder?: string,
  options: string[]
}

export default function MultiSelect({label, placeholder, options}: Props) {
  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option}
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={placeholder}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          key={option}
          value={option}
          sx={{ justifyContent: 'space-between' }}
        >
          {option}
          {selected ? <CheckIcon color="info" /> : null}
        </MenuItem>
      )}
    />
  );
}
