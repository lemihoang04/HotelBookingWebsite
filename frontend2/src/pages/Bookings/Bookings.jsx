import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmModal from "./Delete_Modal";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const sampleData = [
      {
        BookingID: 1,
        Username: "Lê Minh Hoàng",
        RoomID: 501,
        CheckInDate: "2024-11-20",
        CheckOutDate: "2024-11-25",
        TotalPrice: 500,
        BookingStatus: "Confirmed",
        Time: "2024-11-19 10:00 AM",
      },
      {
        BookingID: 2,
        Username: "Nguyễn Quang Minh",
        RoomID: 502,
        CheckInDate: "2024-11-22",
        CheckOutDate: "2024-11-28",
        TotalPrice: 700,
        BookingStatus: "Pending",
        Time: "2024-11-19 11:00 AM",
      },
    ];
    setBookings(sampleData);
  }, []);

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setBookings((prevBookings) =>
      prevBookings.filter((b) => b.BookingID !== selectedBooking.BookingID)
    );
    setSelectedBooking(null);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Booking</h2>
      <table className="table table-bordered table-striped rounded">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Room ID</th>
            <th>Check In Date</th>
            <th>Check Out Date</th>
            <th>Total Price</th>
            <th>Booking Status</th>
            <th>Booking Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.BookingID}>
                <td>{booking.BookingID}</td>
                <td>{booking.Username}</td>
                <td>{booking.RoomID}</td>
                <td>{booking.CheckInDate}</td>
                <td>{booking.CheckOutDate}</td>
                <td>${booking.TotalPrice}</td>
                <td>{booking.BookingStatus}</td>
                <td>{booking.Time}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteClick(booking)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No bookings available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <nav aria-label="Pagination">
  <ul className="pagination justify-content-end">
    <li className="page-item disabled">
      <a className="page-link" href="#" tabIndex="-1">Previous</a>
    </li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item active">
      <a className="page-link" href="#">
        2 <span className="sr-only">(current)</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item">
      <a className="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
    
      {/* Modal */}
      <DeleteConfirmModal
        toggle={toggleModal}
        isOpen={showModal}
        booking={selectedBooking}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Bookings;