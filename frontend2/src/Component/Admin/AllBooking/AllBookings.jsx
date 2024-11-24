import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmModal from "./BookingDeleteModal";
import {
	ChangeRoomAva,
	DeleteBookings,
	DeletePayments,
	GetAllBookings,
	GetPaymentID,
	UpdatePayment,
} from "../../../services/apiService";
import { GetUserID } from "../../../services/userService";
import { toast } from "react-toastify";

const AllBooking = () => {
	const [bookings, setBookings] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(5);

	const fetchBooking = async () => {
		try {
			let res = await GetAllBookings();
			let bookingsData = res;
			let updatedBookings = await Promise.all(
				bookingsData.map(async (booking) => {
					try {
						let userResponse = await GetUserID(booking.UserID);
						let paymentResponse = await GetPaymentID(booking.BookingID);
						let payment = paymentResponse[0] || {};

						return {
							...booking,
							UserName: userResponse?.Name || "Unknown",
							PaymentStatus: payment.PaymentStatus || "Unknown",
							Availability: "0",
						};
					} catch (error) {
						console.error(
							`Error processing BookingID ${booking.BookingID}:`,
							error
						);
						return {
							...booking,
							UserName: "Error fetching user",
							PaymentStatus: "Error fetching payment",
							Availability: "0",
						};
					}
				})
			);
			setBookings(updatedBookings);
		} catch (error) {
			console.error("Error fetching bookings:", error);
		}
	};

	useEffect(() => {
		fetchBooking();
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
	const handleConfirmDelete = async (booking) => {
		let res = await DeletePayments(booking.BookingID);
		let response = await DeleteBookings(booking.BookingID);
		await ChangeRoomAva(booking);
		setBookings((prevBookings) =>
			prevBookings.filter((b) => b.BookingID !== selectedBooking.BookingID)
		);
		setSelectedBooking(null);
		setShowDeleteModal(false);
		if (response && response.message) {
			toast.success(response.message);
		} else {
			toast.error("Delete Error");
		}
	};
	const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

	const handleConfirmBooking = async (BookingID) => {
		let response = await UpdatePayment(BookingID);
		if (response && response.errCode === 0) {
			toast.success(response.message);
			await fetchBooking();
		}
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
							{ key: "BookingStatus", label: "Booking Status" },
							{ key: "PaymentStatus", label: "Payment Status" },
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
								<td>
									<span
										className={`badge ${
											booking.PaymentStatus === "Completed"
												? "bg-success text-white"
												: "bg-warning text-white"
										}`}
									>
										{booking.PaymentStatus}
									</span>
								</td>
								<td>{booking.Timestamp}</td>
								<td>
									{booking.PaymentStatus === "Pending" && (
										<button
											className="btn btn-success btn-sm me-2"
											onClick={() => handleConfirmBooking(booking.BookingID)}
											title="Confirm Booking"
										>
											Confirm
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
