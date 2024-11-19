import React from "react";
import "../Admin/manageusers.css";
const ManageUsers = () => {
	return (
		<>
			<div>
				<h2>Manage Users</h2>
			</div>
			<div className="users-table mt-3 mx-5">
				<table id="customers">
					<tbody>
						<tr>
							<th>Id</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Number Phone</th>
							<th>Gender</th>
							<th>Email</th>
							<th>Status</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ManageUsers;
