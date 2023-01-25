import React from 'react';
import { DateTime } from 'luxon';

type Props = {
  event: any;
}

export default function Event({
  event
}: Props) {
  const { id, startTime, endTime } = event;
  return (
    <div className='event-card' key={id}>
      <div className='event-title'>Event</div>
      <div><strong>Start:</strong> {DateTime.fromISO(startTime).toFormat('dd LLL yyyy hh:mm a')}</div>
      <div><strong>End:</strong> {DateTime.fromISO(endTime).toFormat('dd LLL yyyy hh:mm a')}</div>
      <br />
      <div><strong>ID:</strong> {id}</div>
    </div>
  )
}