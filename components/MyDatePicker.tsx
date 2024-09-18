import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';


export default function MyDatePicker() {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const printToConsole = (newValue: Dayjs | null) => {
    console.log(newValue?.format('YYYY-MM-DD'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={(newValue: Dayjs | null) => {
          setValue(newValue);
          printToConsole(newValue);
        }}
        sx={{
          '& .MuiInputBase-input': {
            backgroundColor: 'oklch(var(--b1))',
            padding: '12px',
            borderRadius: 'var(--rounded-btn)',
          },
          '& .MuiInputBase-input::placeholder': {
                color: 'oklch(var(--nc))', // Placeholder color
                opacity: 1, // Ensure placeholder isn't dimmed
              },
          '& .MuiInputBase-inputAdornedEnd': {
            color: 'oklch(var(--bc))',
          },
          '& .MuiInputBase-root': {
            border: '1px solid',
            borderColor: 'var(--fallback-bc,oklch(var(--bc)/0.2))',
            borderRadius: 'var(--rounded-btn)',
          },
          '& .MuiSvgIcon-root': {
            color: 'oklch(var(--nc))',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: '0px',
          },
        }}
         />
    </LocalizationProvider>
  );
}





