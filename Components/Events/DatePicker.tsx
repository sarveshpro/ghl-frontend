import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import { DatePicker } from '@mui/x-date-pickers';


type Props = {
  date: DateTime;
  setDate: (date: DateTime) => void;
  label: string;
}

export default function DatePickerField({
  date,
  setDate,
  label
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label={label}
        value={date}
        onChange={(newValue: any) => {
          if (newValue) {
            setDate(newValue);
          }
        }}
        renderInput={(params: any) => <TextField {...params} sx={{ width: '100%' }} />}
      />
    </LocalizationProvider>
  )
}