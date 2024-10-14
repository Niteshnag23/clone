import React, { useState } from "react";
import './BookRoom.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookRoom = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    userType: "ordinary",
    idImage: null,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    roomNumber: "",
    numberOfGuests: 1,
    numberOfRooms: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      idImage: e.target.files[0],
    });
  };

  const handleDateChange = (date, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission here (e.g., send data to an API)
    alert("Booking submitted!"); // Placeholder alert for submission
  };

  return (
    <>
      <div className="bg-overlay"></div>
      <div className="booking-form">
        <h2>Plan Your Stay With Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Number of Guests:</label>
            <input
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label class="dif">Number of Rooms:</label>
            <input
              type="number"
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>

          <div className="date-container">
            <div className="form-group">
              <label>Check-in Date:</label>
              <DatePicker
                selected={formData.checkInDate}
                onChange={(date) => handleDateChange(date, 'checkInDate')}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className="date-picker"
              />
            </div>
            <div className="form-group">
              <label>Check-out Date:</label>
              <DatePicker
                selected={formData.checkOutDate}
                onChange={(date) => handleDateChange(date, 'checkOutDate')}
                dateFormat="dd/MM/yyyy"
                minDate={formData.checkInDate}
                className="date-picker"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Type:</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              required
            >
              <option value="ordinary">Non-Government</option>
              <option value="government">Government Official</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              Upload {formData.userType === "ordinary" ? "Aadhar/PAN" : "Government ID"}:
            </label>
            <input
              type="file"
              name="idImage"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" className="btn-book-now">Book Now</button>
        </form>
      </div>
    </>
  );
};

export default BookRoom;
