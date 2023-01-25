import React from 'react';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import TextField from '@mui/material/TextField';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';

type Props = {
  date: DateTime;
  setDate: (date: DateTime) => void;
}

export default function DatePicker({
  date,
  setDate,
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={date}
        onChange={(newValue: any) => {
          if (newValue) {
            setDate(newValue);
          }
        }}
        minDate={DateTime.now()}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}