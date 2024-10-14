import React, { useState } from 'react';
import './RoomAvailabilityCalendar.css'; 
import { mockRoomData } from '../components/mockData.js'; // Adjust the import path as necessary

const RoomAvailabilityCalendar = () => {
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();

  // State to hold selected location
  const [selectedLocation, setSelectedLocation] = useState('Dantewada'); // Default to 'Dantewada'

  // Generate dates for the next 7 days
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  // Function to check room availability based on bookings
  const isRoomAvailable = (bookings, date) => {
    return !bookings.some(booking => {
      const bookingStart = new Date(booking.start);
      const bookingEnd = new Date(booking.end);
      return date >= bookingStart && date <= bookingEnd;
    });
  };

  // Get room availability data based on the selected location
  const roomAvailability = {};
  if (selectedLocation && mockRoomData[selectedLocation]) {
    const rooms = mockRoomData[selectedLocation].rooms;

    rooms.forEach(room => {
      roomAvailability[room.roomNumber] = dates.map(date => isRoomAvailable(room.bookings, date));
    });
  }

  return (
    <div className="room-availability-calendar">
      <h2 className="calendar-title">{month} {year}</h2>

      {/* Dropdown for selecting location */}
      <label htmlFor="location-select" className='loclab'>Select Location:</label>
      <select
        id="location-select"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)} // Update state on change
      >
        <option value="Dantewada">Dantewada</option>
        <option value="Geedam">Geedam</option>
        <option value="Barsoor">Barsoor</option>
      </select>

      {/* Legend section above the table */}
      <div className="legend">
        <p style={{ display: 'inline-block', marginRight: '10px' }}>
          <span style={{color: 'green', fontSize: '20px'}}>●</span> Available Room
        </p>
        <p style={{ display: 'inline-block' }}>
          <span style={{fontSize: '20px'}}>🔒</span> Booked Room
        </p>
      </div>

      <div className="calendar-wrapper">
        <div className="calendar-table">
          {/* Render the header with room numbers and the days */}
          <div className="room-header" style={{fontSize:"20px"}}>Room No.</div>
          {dates.map((date, index) => (
            <div key={index} className="date-header">
              <div className="day-box">{date.toLocaleString('default', { weekday: 'long' })}</div>
              <div className="date-box">{date.toLocaleDateString()}</div>
            </div>
          ))}

          {/* Display room availability */}
          {Object.keys(roomAvailability).length > 0 ? (
            Object.keys(roomAvailability).map(room => (
              <React.Fragment key={room}>
                <div className="room-item">Room {room}</div>
                {roomAvailability[room].map((available, index) => (
                  <div key={index} className="dot-container">
                    {available ? (
                      <span style={{color: 'green', fontSize: '20px'}}>●</span>
                    ) : (
                      <span style={{fontSize: '20px'}}>🔒</span>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))
          ) : (
            <div>No rooms available for the selected location.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomAvailabilityCalendar;
