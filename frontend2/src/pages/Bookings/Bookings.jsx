import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmModal from "./Delete_Modal";
import {
	ChangeRoomAva,
	DeleteBookings,
	DeletePayments,
	GetBookingID,
} from "../../services/apiService";
import { UserContext } from "../../Context/UserProvider";
import { toast } from "react-toastify";

const Bookings = () => {
	const [bookings, setBookings] = useState([]);
	const { user, getformValue } = useContext(UserContext);
	const [showModal, setShowModal] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [dataValue, setDataValue] = useState(
		JSON.parse(localStorage.getItem("formValues")) || {}
	);
	const fetchBooking = async () => {
		let response = await GetBookingID(user.account.UserID);
		if (response && response.errCode === 0) {
			let updatedBookings = response.booking.map((booking) => ({
				...booking,
				Username: user.account.Name,
			}));
			setBookings(updatedBookings);
		}
	};
	useEffect(() => {
		fetchBooking();
	}, []);

	const handleDeleteClick = (booking) => {
		setSelectedBooking(booking);
		setShowModal(true);
	};

	const handleConfirmDelete = async (booking_id) => {
		let res = await DeletePayments(booking_id);
		let response = await DeleteBookings(booking_id);
		const updatedFormValue = {
			...dataValue,
			Availability: "0",
		};
		setDataValue(updatedFormValue);
		getformValue(updatedFormValue);
		await ChangeRoomAva(updatedFormValue);
		setBookings((prevBookings) =>
			prevBookings.filter((b) => b.BookingID !== selectedBooking.BookingID)
		);
		setSelectedBooking(null);
		if (response && response.message) {
			toast.success(response.message);
		} else {
			toast.error("Delete Error");
		}
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
						bookings.map((booking, index) => (
							<tr key={booking.BookingID}>
								<td>{index + 1}</td>
								<td>{booking.Username}</td>
								<td>{booking.RoomID}</td>
								<td>{booking.CheckInDate}</td>
								<td>{booking.CheckOutDate}</td>
								<td>${booking.TotalPrice}</td>
								<td>{booking.BookingStatus}</td>
								<td>{booking.Timestamp}</td>
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
							<td colSpan="9" className="text-center text-danger">
								No bookings available.
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<nav aria-label="Pagination">
				<ul className="pagination justify-content-end">
					<li className="page-item disabled">
						<a className="page-link" href="#" tabIndex="-1">
							Previous
						</a>
					</li>
					<li className="page-item">
						<a className="page-link" href="#">
							1
						</a>
					</li>
					<li className="page-item active">
						<a className="page-link" href="#">
							2 <span className="sr-only">(current)</span>
						</a>
					</li>
					<li className="page-item">
						<a className="page-link" href="#">
							3
						</a>
					</li>
					<li className="page-item">
						<a className="page-link" href="#">
							Next
						</a>
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
