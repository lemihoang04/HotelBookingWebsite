import React from "react";
import "../Admin/selectionType.css";

const SelectionType = ({ activeMenu, setActiveMenu }) => {
	return (
		<div className="sidebar-container">
			<h1 className="brand-name">Sona</h1>
			<ul className="sidebar-menu">
				<li
					className={activeMenu === "dashboard" ? "active" : ""}
					onClick={() => setActiveMenu("dashboard")}
				>
					<i className="fas fa-tachometer-alt"></i> Admin Dashboard
				</li>

				<div className="sidebar-heading">Rooms</div>
				<li
					className={activeMenu === "all-rooms" ? "active" : ""}
					onClick={() => setActiveMenu("all-rooms")}
				>
					<i className="fas fa-cogs"></i> All Rooms
				</li>
				<li
					className={activeMenu === "add-rooms" ? "active" : ""}
					onClick={() => setActiveMenu("add-rooms")}
				>
					<i className="fas fa-plus-circle"></i> Add Rooms
				</li>

				<div className="sidebar-heading">Users</div>
				<li
					className={activeMenu === "manage-users" ? "active" : ""}
					onClick={() => setActiveMenu("manage-users")}
				>
					<i className="fas fa-users"></i> Manage Users
				</li>
				<li
					className={activeMenu === "all-bookings" ? "active" : ""}
					onClick={() => setActiveMenu("all-bookings")}
				>
					<i className="fas fa-book"></i> All Bookings
				</li>
			</ul>
		</div>
	);
};

export default SelectionType;
