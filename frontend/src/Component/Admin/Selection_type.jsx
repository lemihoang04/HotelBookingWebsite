import React from "react";
import "../Admin/selectionType.css";

const Selection_type = () => {
	return (
		<div className="sidebar-container">
			<ul
				className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
				id="accordionSidebar"
			>
				<li>
					<h1 className="brand-name">Sona</h1>
				</li>
				<hr className="sidebar-divider my-0" />

				<li className="nav-item">
					<a className="nav-link" href="/admin">
						<i className="fas fa-fw fa-tachometer-alt"></i>
						<span>Admin Dashboard</span>
					</a>
				</li>

				<hr className="sidebar-divider" />

				<div className="sidebar-heading">Rooms</div>

				<li className="nav-item">
					<a
						className="nav-link collapsed"
						href="#"
						data-toggle="collapse"
						data-target="#collapseTwo"
						aria-expanded="true"
						aria-controls="collapseTwo"
					>
						<i className="fas fa-fw fa-cog"></i>
						<span>All Rooms</span>
					</a>
				</li>

				<li className="nav-item">
					<a
						className="nav-link collapsed"
						href="#"
						data-toggle="collapse"
						data-target="#collapseUtilities"
						aria-expanded="true"
						aria-controls="collapseUtilities"
					>
						<i className="fas fa-fw fa-wrench"></i>
						<span>Add Rooms</span>
					</a>
				</li>

				<hr className="sidebar-divider" />

				<div className="sidebar-heading">Users</div>

				<li className="nav-item">
					<a
						className="nav-link collapsed"
						href="#"
						data-toggle="collapse"
						data-target="#collapsePages"
						aria-expanded="true"
						aria-controls="collapsePages"
					>
						<i className="fas fa-fw fa-folder"></i>
						<span>Manage Users</span>
					</a>
				</li>

				<li className="nav-item">
					<a className="nav-link" href="charts.html">
						<i className="fas fa-fw fa-chart-area"></i>
						<span>All Bookings</span>
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Selection_type;
