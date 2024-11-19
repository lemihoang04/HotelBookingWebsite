import React from "react";
import "../Admin/allrooms.css";
const AllRooms = () => {
	return (
		<>
			<div>
				<h2>All Room</h2>
			</div>
			<div className="users-table mt-3 mx-5">
				<table id="customers">
					<tbody>
						<tr>
							<th>Id</th>
							<th>Room Name</th>
							<th>Total Rooms</th>
							<th>No of Beds</th>
							<th>Price</th>
							<th>Image</th>
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

export default AllRooms;
