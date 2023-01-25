import { DateTime } from 'luxon';
import React from 'react'

type Props = {
  slots: any[];
  slot: string;
  setSlot: (slot: string) => void;
  timezone: string;
}

export default function SlotPicker({
  slots,
  slot,
  setSlot,
  timezone
}: Props) {

  const handleSlotClick = (s: string) => {
    setSlot(s);
  }

  const isSlotSelected = (s: string) => {
    return s === slot;
  }

  return (
    <div className='slot-grid'>
      {slots.filter((t) => {
        return DateTime.fromISO(t).toMillis() > DateTime.now().toMillis();
      }).map((s) => {
        return (
          <div key={s} className={`slot ${isSlotSelected(s) ? 'slot-selected' : ''}`} onClick={() => handleSlotClick(s)}>
            {DateTime.fromISO(s).setZone(timezone).toFormat('hh:mm a')}
          </div>
        )
      })}
    </div>
  )
}