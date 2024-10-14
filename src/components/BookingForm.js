import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingForm.css';
import { mockRoomData } from '../components/mockData.js'; // Import the mock data

const BookingForm = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('Dantewada');
  const [rooms, setRooms] = useState([]);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);

  const checkAvailability = () => {
    if (!checkInDate || !checkOutDate) return;

    const availableRooms = mockRoomData[selectedLocation].rooms.map((room) => {
      const isAvailable = room.bookings.every(booking => {
        const bookingStart = new Date(booking.start);
        const bookingEnd = new Date(booking.end);
        return (
          (checkOutDate <= bookingStart || checkInDate >= bookingEnd)
        );
      });

      return {
        roomNumber: room.roomNumber,
        available: isAvailable,
      };
    });

    setRooms(availableRooms);
    setAvailabilityChecked(true);
  };

  const closeAvailabilitySection = () => {
    setAvailabilityChecked(false);
    setRooms([]); // Clear room availability when closed
  };

  // Effect to scroll to availability section when it becomes visible
  useEffect(() => {
    if (availabilityChecked) {
      const availabilitySection = document.getElementById('availability-section');
      if (availabilitySection) {
        availabilitySection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [availabilityChecked]); // Runs when availabilityChecked changes

  return (
    <div className="booking-form">
      <div className="form-group">
        <div className="location-select-container">
          <label>Location</label>
          <select 
            className="location-select"
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="Dantewada">Dantewada</option>
            <option value="Geedam">Geedam</option>
            <option value="Barsoor">Barsoor</option>
          </select>
        </div>

        <div className="date-picker-group">
          <div className="date-picker">
            <label>Check-in | चेक इन</label>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              placeholderText="Select Check-in Date"
            />
          </div>

          <div className="date-picker">
            <label>Check-out | चेक आउट</label>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              placeholderText="Select Check-out Date"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <button onClick={checkAvailability}>Check Availability</button>
        <button className="book-now">Book Now</button>
      </div>

      {availabilityChecked && (
        <div className="availability-section" id="availability-section">
          <button className="close-button" onClick={closeAvailabilitySection}>×</button>
          <h3>Room Availability</h3>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div className="room-status" key={room.roomNumber}>
                <span>Room {room.roomNumber}</span>
                <span>{room.available ? 'Available' : 'Not Available'}</span>
                <span className={`status-dot ${room.available ? 'green' : 'red'}`}></span>
              </div>
            ))
          ) : (
            <div>No rooms available for the selected dates.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingForm;
