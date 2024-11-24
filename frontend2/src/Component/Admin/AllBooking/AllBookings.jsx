import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmModal from "./BookingDeleteModal";

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 

  useEffect(() => {
    const sampleData = [
      {
        BookingID: 1,
        UserName: "John Doe",
        RoomID: 101,
        CheckInDate: "2024-10-30",
        CheckOutDate: "2024-11-05",
        TotalPrice: 500,
        BookingStatus: "Confirmed",
        Time: "2024-10-29 14:00",
      },
      {
        BookingID: 2,
        UserName: "Jane Smith",
        RoomID: 102,
        CheckInDate: "2024-11-03",
        CheckOutDate: "2024-11-07",
        TotalPrice: 600,
        BookingStatus: "Pending",
        Time: "2024-10-31 10:30",
      },
      {
        BookingID: 3,
        UserName: "Jane Smith",
        RoomID: 102,
        CheckInDate: "2024-11-03",
        CheckOutDate: "2024-11-07",
        TotalPrice: 600,
        BookingStatus: "Confirmed",
        Time: "2024-10-31 10:30",
      },
      {
        BookingID: 4,
        UserName: "Jane Smith",
        RoomID: 102,
        CheckInDate: "2024-11-03",
        CheckOutDate: "2024-11-07",
        TotalPrice: 600,
        BookingStatus: "Pending",
        Time: "2024-10-31 10:30",
      },
      {
        BookingID: 5,
        UserName: "Jane Smith",
        RoomID: 102,
        CheckInDate: "2024-11-03",
        CheckOutDate: "2024-11-07",
        TotalPrice: 600,
        BookingStatus: "Pending",
        Time: "2024-10-31 10:30",
      },
      {
        BookingID: 6,
        UserName: "Jane Smith",
        RoomID: 102,
        CheckInDate: "2024-11-03",
        CheckOutDate: "2024-11-07",
        TotalPrice: 600,
        BookingStatus: "Pending",
        Time: "2024-10-31 10:30",
      },
    ];
    setBookings(sampleData);
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedBookings = [...bookings].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setBookings(sortedBookings);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setBookings((prevBookings) =>
      prevBookings.filter((b) => b.BookingID !== selectedBooking.BookingID)
    );
    setSelectedBooking(null);
    setShowDeleteModal(false);
  };

  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  const handleConfirmBooking = (bookingID) => {
    setBookings((prevBookings) =>
      prevBookings.map((b) =>
        b.BookingID === bookingID ? { ...b, BookingStatus: "Confirmed" } : b
      )
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  return (
    <div className="container mt-4 mx-3" style={{ width: "1000px" }}>
      <h2 className="mb-4 p-2 border-bottom">All Bookings</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th
              key="BookingID"
              onClick={() => handleSort("BookingID")}
              style={{ cursor: "pointer", width: "80px" }}
            >
              Booking ID {getSortIndicator("BookingID")}
            </th>
            {[
              { key: "UserName", label: "User Name" },
              { key: "RoomID", label: "Room ID" },
              { key: "CheckInDate", label: "Check-In Date" },
              { key: "CheckOutDate", label: "Check-Out Date" },
              { key: "TotalPrice", label: "Total Price" },
              { key: "BookingStatus", label: "Status" },
              { key: "Time", label: "Time" },
            ].map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={{ cursor: "pointer" }}
              >
                {col.label} {getSortIndicator(col.key)}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.length > 0 ? (
            currentBookings.map((booking) => (
              <tr key={booking.BookingID}>
                <td>{booking.BookingID}</td>
                <td>{booking.UserName}</td>
                <td>{booking.RoomID}</td>
                <td>{booking.CheckInDate}</td>
                <td>{booking.CheckOutDate}</td>
                <td>${booking.TotalPrice}</td>
                <td>
                  <span
                    className={`badge ${
                      booking.BookingStatus === "Confirmed"
                        ? "bg-success text-white"
                        : "bg-warning text-white"
                    }`}
                  >
                    {booking.BookingStatus}
                  </span>
                </td>
                <td>{booking.Time}</td>
                <td>
                  {booking.BookingStatus === "Pending" && (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleConfirmBooking(booking.BookingID)}
                      title="Confirm Booking"
                    >
                      Comfirm
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteClick(booking)}
                    title="Delete"
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

      <nav>
        <ul className="pagination justify-content-end">
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <button className="page-link">Previous</button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              <button className="page-link">{index + 1}</button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <button className="page-link">Next</button>
          </li>
        </ul>
      </nav>

      <DeleteConfirmModal
        toggle={toggleDeleteModal}
        isOpen={showDeleteModal}
        room={selectedBooking}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AllBooking;
