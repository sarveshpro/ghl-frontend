import { Button, MenuItem, TextField } from '@mui/material'
import { DateTime } from 'luxon'
import Link from 'next/link'
import React from 'react'
import Swal from 'sweetalert2'
import { bookSlot, fetchSlots } from '../../lib/api'
import DatePicker from './DatePicker'
import SlotPicker from './SlotPicker'

type Props = {}

const timezones = [
  'America/Los_Angeles',
  'America/New_York',
  'Pacific/Fiji',
  'Asia/Kolkata',
  'Europe/London',
  'Europe/Paris',
  'Australia/Sydney',
  'Asia/Tokyo',
];


export default function Form({ }: Props) {
  const [date, setDate] = React.useState(DateTime.now());
  const [slots, setSlots] = React.useState([]);
  const [slot, setSlot] = React.useState('');
  const [slotsLoading, setSlotsLoading] = React.useState(false);
  const [duration, setDuration] = React.useState(30);
  const [timezone, setTimezone] = React.useState('Asia/Kolkata');
  const [isFormSubmitting, setIsFormSubmitting] = React.useState(false);

  React.useEffect(() => {
    fetchSlotsWithDate();
  }, [timezone, date]);

  const fetchSlotsWithDate = async () => {
    setSlotsLoading(true);
    const newSlots = await fetchSlots(date, duration, timezone);
    if (newSlots) {
      setSlots(newSlots);
    }
    setSlot('');
    setSlotsLoading(false);
  }

  const validateForm = () => {
    if (!date) {
      Swal.fire({
        'title': 'Error',
        'text': 'Please select a date',
        'icon': 'error',
        'confirmButtonText': 'Ok'
      });
      return false;
    }
    if (!slot) {
      Swal.fire({
        'title': 'Error',
        'text': 'Please select a slot',
        'icon': 'error',
        'confirmButtonText': 'Ok'
      });
      return false;
    }
    if (!duration) {
      Swal.fire({
        'title': 'Error',
        'text': 'Please select a duration',
        'icon': 'error',
        'confirmButtonText': 'Ok'
      });
      return false;
    }
    return true;
  }

  const handleSubmit = async () => {
    setIsFormSubmitting(true);
    if (!validateForm()) {
      setIsFormSubmitting(false);
      return;
    }

    const response = await bookSlot(slot, Number(duration));

    if (response.status === 201) {
      Swal.fire({
        'title': 'Appointment Booked',
        'text': 'Your appointment has been booked successfully',
        'icon': 'success',
        'confirmButtonText': 'Ok'
      });
    } else {
      Swal.fire({
        'title': 'Error',
        'text': response.data.message || 'Something went wrong',
        'icon': 'error',
        'confirmButtonText': 'Ok'
      });
    }
    setIsFormSubmitting(false);
  }

  return (
    <div>
      <Link href='/events'>
        Events Page
      </Link>
      <div className="title">Book Appointment</div>
      <div className="calendar">
        <div className='field-wrapper'>
          <div className="field-name">Select Timezone</div>
          <TextField
            id="timezone"
            label="Timezone"
            type="text"
            variant='outlined'
            value={timezone}
            select
            onChange={(e) => setTimezone(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '100%' }}
            className='input-field'
          >
            {timezones.map((tz: any) => {
              return (
                <MenuItem key={tz} value={tz}>
                  {tz}
                </MenuItem>
              )
            })}
          </TextField>
        </div>
        <div className='field-wrapper'>
          <div className="field-name">Select a date</div>
          <DatePicker date={date} setDate={setDate} />
        </div>
        <div className='field-wrapper'>
          <div className="field-name">Session Duration</div>
          <TextField
            id="duration"
            label="Duration"
            type="number"
            variant='outlined'
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '100%' }}
            className='input-field'
          />
        </div>
        <div className='field-wrapper'>
          <Button variant='contained' color='primary' className='primaryButton' sx={{ width: '100%' }} onClick={fetchSlotsWithDate}>Change Duration</Button>
        </div>
        <div className='field-wrapper'>
          <div className="field-name">Select a slot</div>
          {slots.length === 0 ? <div>No slots available</div> :
            <>
              {slotsLoading ? <div>Loading...</div> :
                <SlotPicker slots={slots} slot={slot} setSlot={setSlot} timezone={timezone} />
              }
            </>}
        </div>
        <div className='field-wrapper'>
          <Button variant='contained' color='primary' className='primaryButton' sx={{ width: '100%' }} onClick={handleSubmit}>Book Appointment</Button>
        </div>
      </div>
    </div>
  )
}