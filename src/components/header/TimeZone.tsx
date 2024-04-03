'use client';
import { useEffect, useState } from 'react';
import { useIsClient } from '@/lib/context/IsClientContext';

type Props = {
  // The timeZone option in the toLocaleTimeString
  // method accepts a string representing a time zone
  // identifier from the IANA Time Zone Database.
  // The IANA time zone identifiers usually have the format 'Continent/City'.
  timeZone: string;
};

const TimeZone = ({ timeZone }: Props) => {
  const isClient = useIsClient();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <span>Local Time ({timeZone})</span>
      <div className='rounded-lg bg-foreground px-4 py-3 text-xl xl:text-2xl'>
        {isClient
          ? date.toLocaleTimeString('en-US', { hour12: false, timeZone })
          : ''}
      </div>
    </>
  );
};

export default TimeZone;
