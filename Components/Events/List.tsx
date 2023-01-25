import React from 'react'
import { DateTime } from "luxon";
import { fetchEvents } from '../../lib/api';
import Event from './Event';
import Link from 'next/link';
import { Button } from '@mui/material';
import DatePickerField from './DatePicker';


type Props = {}

export default function EventList({ }: Props) {
  const [events, setEvents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [startDate, setStartDate] = React.useState<DateTime>(DateTime.now());
  const [endDate, setEndDate] = React.useState<DateTime>(DateTime.now().plus({ days: 7 }));

  React.useEffect(() => {
    handleFetchEvents();
  }, []);

  const handleFetchEvents = async () => {
    setLoading(true);
    const response = await fetchEvents(startDate, endDate);
    if (response) {
      setEvents(response);
    }
    setLoading(false);
  }

  return (
    <div>
      <Link href='/'>
        Booking Page
      </Link>
      <div className="title">View Events</div>
      <div className='field-wrapper'>
        <DatePickerField
          date={startDate}
          setDate={setStartDate}
          label='Start Date'
        />
      </div>
      <div className='field-wrapper'>
        <DatePickerField
          date={endDate}
          setDate={setEndDate}
          label='End Date'
        />
      </div>
      <div className='field-wrapper'>
        <Button variant='contained' color='primary' className='primaryButton' sx={{ width: '320px' }} onClick={handleFetchEvents}>Get Slots</Button>
      </div>
      <div>
        {events.length === 0 && !loading && <div>No events found</div>}
        {events ? <div className='field-wrapper'>
          {events.map((event: any) => (
            <Event key={event.id} event={event} />
          ))}
        </div>
          : null}
      </div>
    </div>
  )
}