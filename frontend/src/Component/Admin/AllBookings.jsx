import React from "react";
import "../Admin/allbookings.css";
const AllBookings = () => {
	return (
		<>
			<div>
				<h2>All Booking</h2>
			</div>
			<div className="users-table mt-3 mx-5">
				<table id="customers">
					<tbody>
						<tr>
							<th>Id</th>
							<th>User Name</th>
							<th>Room Name</th>
							<th>Check In</th>
							<th>Check Out</th>
							<th>No of Days</th>
							<th>Price</th>
							<th>Booked On</th>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default AllBookings;
