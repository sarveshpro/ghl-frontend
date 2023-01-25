import { DateTime } from "luxon";

// function to fetch available slots from the API
export const fetchSlots = async (
  date: DateTime,
  duration: number,
  timezone: string
) => {
  try {
    const startDateTime = date
      .setZone(timezone, { keepLocalTime: true })
      .startOf("day")
      .toISO();
    const endDateTime = date
      .setZone(timezone, { keepLocalTime: true })
      .endOf("day")
      .toISO();
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/availability?startDate=${encodeURIComponent(
        startDateTime
      )}&endDate=${encodeURIComponent(
        endDateTime
      )}&duration=${duration}&timezone=${encodeURIComponent(timezone)}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

// function to book a slot
export const bookSlot = async (slot: string, duration: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: slot,
        duration,
      }),
    });
    return {
      status: response.status,
      data: await response.json(),
    };
  } catch (error) {
    console.log(error);
  }
};

// function to get all events
export const fetchEvents = async (startDate: DateTime, endDate: DateTime) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events?startDate=${encodeURIComponent(
        startDate.toISO()
      )}&endDate=${encodeURIComponent(endDate.toISO())}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};
