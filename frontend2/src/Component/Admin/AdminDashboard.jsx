import React, { useEffect, useState } from "react";
import "../Admin/admindashboard.css";
import { GetAllUser } from "../../services/userService";
import { GetAllBookings, GetAllRooms } from "../../services/apiService";

const AdminDashboard = ({ setActiveMenu }) => {
	const [user, setUser] = useState("");
	const [room, setRoom] = useState("");
	const [booking, setBooking] = useState("");
	const fetchData = async () => {
		let users = await GetAllUser();
		let rooms = await GetAllRooms();
		let bookings = await GetAllBookings();
		setUser(users.length);
		setRoom(rooms.length);
		setBooking(bookings.length);
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<section className="content">
			<div className="dashboard-information mt-2 mx-3">
				<h1 className="mb-4 p-2 border-bottom">Website Dashboard Manager</h1>
				<div className="metrics-overview">
					{/* Users */}
					<div
						className="count users"
						onClick={() => setActiveMenu("manage-users")}
					>
						<i className="bi bi-person"></i>
						<div className="recruitment-stats">
							<div className="label">Users</div>
							<div className="number-display">
								<b className="number">{user}</b>
							</div>
						</div>
					</div>

					{/* Total Rooms */}
					<div
						className="count rooms"
						onClick={() => setActiveMenu("all-rooms")}
					>
						<i className="bi bi-hospital"></i>
						<div className="recruitment-stats">
							<div className="label">Rooms</div>
							<div className="number-display">
								<b className="number">{room}</b>
							</div>
						</div>
					</div>

					{/* Bookings */}
					<div
						className="count bookings"
						onClick={() => setActiveMenu("all-bookings")}
					>
						<i className="bi bi-calendar-event"></i>
						<div className="recruitment-stats">
							<div className="label">Bookings</div>
							<div className="number-display">
								<b className="number">{booking}</b>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AdminDashboard;
