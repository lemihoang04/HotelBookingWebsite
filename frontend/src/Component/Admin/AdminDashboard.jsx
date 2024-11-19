import React from "react";
import "../Admin/admindashboard.css";
const AdminDashboard = ({ setActiveMenu }) => {
	return (
		<section className="content">
			<div className="dashboard-information">
				<h1 className="website-dashboard-manager">Website Dashboard Manager</h1>
				<div className="metrics-overview">
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
				</div>
			</div>
		</section>
	);
};

export default AdminDashboard;
