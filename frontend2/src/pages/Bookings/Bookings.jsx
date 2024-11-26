import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmModal from "./Delete_Modal";
import {
	ChangeRoomAva,
	DeleteBookings,
	DeletePayments,
	GetBookingID,
	GetPaymentID,
} from "../../services/apiService";
import { UserContext } from "../../Context/UserProvider";
import { toast } from "react-toastify";

const Bookings = () => {
	const [bookings, setBookings] = useState([]);
	const { user, getformValue, formValues } = useContext(UserContext);
	const [showModal, setShowModal] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [dataValue, setDataValue] = useState(
		JSON.parse(localStorage.getItem("formValues")) || {}
	);
	const fetchBooking = async () => {
		try {
			let response = await GetBookingID(user.account.UserID);
			if (response && response.errCode === 0) {
				let updatedBookings = await Promise.all(
					response.booking.map(async (booking) => {
						try {
							let paymentResponse = await GetPaymentID(booking.BookingID);
							let payment = paymentResponse[0] || {};
							return {
								...booking,
								Username: user.account.Name,
								PaymentStatus: payment.PaymentStatus || "Unknown",
							};
						} catch (error) {
							console.error(
								`Error fetching payment for BookingID ${booking.BookingID}:`,
								error
							);
							return {
								...booking,
								Username: user.account.Name,
								PaymentStatus: "Error fetching payment",
							};
						}
					})
				);
				setBookings(updatedBookings);
			} else {
				console.error("Error fetching bookings:", response);
				toast.error(response.error);
			}
		} catch (error) {
			console.error("Error in fetchBooking:", error);
			toast.error("An error occurred while fetching bookings.");
		}
	};

	useEffect(() => {
		fetchBooking();
	}, []);

	const handleDeleteClick = (booking) => {
		setSelectedBooking(booking);
		setShowModal(true);
	};

	const handleConfirmDelete = async (booking) => {
		let res = await DeletePayments(booking.BookingID);
		let response = await DeleteBookings(booking.BookingID);
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
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(5);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(bookings.length / itemsPerPage);
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
						<th>Payment Status</th>
						<th>Booking Time</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{currentBookings.length > 0 ? (
						currentBookings.map((booking, index) => (
							<tr key={booking.BookingID}>
								<td>{index + 1}</td>
								<td>{booking.Username}</td>
								<td>{booking.RoomID}</td>
								<td>{booking.CheckInDate}</td>
								<td>{booking.CheckOutDate}</td>
								<td>${booking.TotalPrice}</td>
								<td><span
										className={`badge ${
											booking.BookingStatus === "Confirmed"
												? "bg-success text-white"
												: "bg-warning text-white"
										}`}
									>
										{booking.BookingStatus}
									</span></td>
								<td><span
										className={`badge ${
											booking.PaymentStatus === "Completed"
												? "bg-success text-white"
												: "bg-warning text-white"
										}`}
									>
										{booking.PaymentStatus}
									</span></td>
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
