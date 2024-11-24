import React from "react";
import "../Admin/admindashboard.css";

const AdminDashboard = ({ setActiveMenu }) => {
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
								<b className="number">3</b>
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
								<b className="number">8</b>
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
								<b className="number">5</b>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AdminDashboard;
