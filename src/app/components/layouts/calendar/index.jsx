// Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Mon Calendrier</h2>
      <Calendar
        onChange={onChange}
        value={date}
      />
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Date sélectionnée: {date.toDateString()}
      </p>
    </div>
  );
};

export default MyCalendar;
