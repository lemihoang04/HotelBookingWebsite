import React, { useState } from "react";
import AdminDashboard from "../Admin/AdminDashboard";
import SelectionType from "./Selection_type";
import AllRooms from "./AllRooms";
import AddRooms from "./AddRooms";
import ManageUsers from "./UserManage/ManageUsers";
import AllBookings from "./AllBookings";

const Admin = () => {
	const [activeMenu, setActiveMenu] = useState("dashboard");
	const renderContent = () => {
		switch (activeMenu) {
			case "dashboard":
				return <AdminDashboard setActiveMenu={setActiveMenu} />;
			case "all-rooms":
				return <AllRooms />;
			case "add-rooms":
				return <AddRooms />;
			case "manage-users":
				return <ManageUsers />;
			case "all-bookings":
				return <AllBookings />;
			default:
				return <AdminDashboard setActiveMenu={setActiveMenu} />;
		}
	};

	return (
		<div style={{ display: "flex" }}>
			<SelectionType activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
			<div className="content-area" >{renderContent()}</div>
		</div>
	);
};

export default Admin;
