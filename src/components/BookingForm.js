// BookingForm.js

import React, { useState } from 'react';
import './BookingForm.css'; // Ensure the path is correct

const BookingForm = () => {
    const [formData, setFormData] = useState({
        location: '',
        checkInDate: '',
        checkOutDate: '',
        isGovernmentOfficer: false,
    });
    const [availability, setAvailability] = useState(null);
    const [bookingStatus, setBookingStatus] = useState('');
    const [roomAvailability, setRoomAvailability] = useState([]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const checkAvailability = () => {
        // Example logic to check room availability (Replace with your actual logic)
        const rooms = [
            { roomNumber: 101, available: true },
            { roomNumber: 102, available: false },
            { roomNumber: 103, available: true },
        ];
        setRoomAvailability(rooms);
        setAvailability(true);
    };

    const handleBooking = () => {
        // Logic for booking (replace with actual booking logic)
        if (availability) {
            setBookingStatus('Room booked successfully!');
        } else {
            setBookingStatus('Please check availability before booking.');
        }
    };

    return (
        <div className="booking-form-container">
            <h2>Book a Room</h2>
            <div className="booking-form-group">
                <label htmlFor="location">Location:</label>
                <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                >
                    <option value="">Select location</option>
                    <option value="Location1">Location 1</option>
                    <option value="Location2">Location 2</option>
                    {/* Add more options as needed */}
                </select>
            </div>

            <div className="booking-date-picker-group">
                <div className="booking-date-picker">
                    <label htmlFor="checkInDate">Check-In Date:</label>
                    <input
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="booking-date-picker">
                    <label htmlFor="checkOutDate">Check-Out Date:</label>
                    <input
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={formData.checkOutDate}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="booking-form-group">
                <label>
                    <input
                        type="checkbox"
                        name="isGovernmentOfficer"
                        checked={formData.isGovernmentOfficer}
                        onChange={handleInputChange}
                    />
                    Government Officer (Discounted Price)
                </label>
            </div>

            <div className="check-now">
                <button onClick={checkAvailability} className="check-availability-btn">
                    Check Availability
                </button>
                <button onClick={handleBooking} className="book-now-btn">
                    Book Now
                </button>
            </div>

            {/* Availability Section */}
            {availability && (
                <div className="booking-availability-section">
                    <h3>Room Availability:</h3>
                    {roomAvailability.map((room) => (
                        <div key={room.roomNumber} className="booking-room-status">
                            <span>Room {room.roomNumber}</span>
                            <span className={`booking-status-dot ${room.available ? 'booking-green' : 'booking-red'}`} />
                        </div>
                    ))}
                    <button className="booking-close-button" onClick={() => setAvailability(null)}>
                        Close
                    </button>
                </div>
            )}

            {/* Booking Status Message */}
            {bookingStatus && <p className="booking-status-message">{bookingStatus}</p>}
        </div>
    );
};

export default BookingForm;
