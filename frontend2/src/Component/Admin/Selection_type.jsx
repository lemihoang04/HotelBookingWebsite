import React, { useContext } from "react";
import "../Admin/selectionType.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../Context/UserProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { LogOutUser } from "../../services/userService";
import { toast } from "react-toastify";

const SelectionType = ({ activeMenu, setActiveMenu }) => {
	const { logoutContext } = useContext(UserContext);
	const history = useHistory();
	const HandleLogout = async () => {
		let data = await LogOutUser();
		logoutContext();
		if (data && data.errCode === 0) {
			history.push("/");
			toast.success("Log out success");
		} else {
			toast.error(data.errMessage);
		}
	};
	return (
		<div className="sidebar-container position-relative">
			<h1 className="brand-name">Sona</h1>

			{/* Sidebar menu */}
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

			{/* Dropdown */}
			<div className="dropdown admin-dropdown position-absolute bottom-0 start-50 translate-middle-x mb-3">
				<button
					className="btn btn-primary dropdown-toggle"
					type="button"
					id="adminDropdown"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Xin chào, Admin
				</button>
				<ul className="dropdown-menu" aria-labelledby="adminDropdown">
					<li>
						<button
							className="dropdown-item"
							onClick={() => alert("Change Password clicked!")}
						>
							Change Password
						</button>
					</li>
					<li>
						<button className="dropdown-item" onClick={HandleLogout}>
							Logout
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SelectionType;
