import React, { useState } from "react";
import Booking_Modal from "./Booking_Modal";
const RoomInfo = () => {
	const [isOpenModalBooking, setIsOpenModalBooking] = useState(false);
	const toggleBookingModal = () => {
		setIsOpenModalBooking(!isOpenModalBooking);
	};
	const HandleBooking = () => {
		setIsOpenModalBooking(true);
	};
	return (
		<>
			<Booking_Modal isOpen={isOpenModalBooking} toggle={toggleBookingModal} />
			<div className="breadcrumb-section">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="breadcrumb-text">
								<h2>Check Rooms</h2>
								<div className="bt-option">
									<a href="/">Home</a>
									<span>Detail Room</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: "100vh" }}
			>
				<div className="card mt-3 mb-3" style={{ minWidth: "1248px" }}>
					<div className="row g-0">
						<div className="col-md-4">
							<img
								src={require("../img/room/room-1.jpg")}
								className="img-fluid rounded-start"
								alt="..."
							/>
						</div>
						<div className="col-md-8">
							<div className="card-body">
								<h5 className="card-title">ABC Room</h5>
								<p className="card-text">
									This is a wider card with supporting text below as a natural
									lead-in to additional content. This content is a little bit
									longer.
								</p>
								<p className="card-text">
									<small className="text-muted">Last updated 3 mins ago</small>
								</p>
								<div className="d-flex justify-content-end">
									<button
										type="button"
										className="btn btn-primary"
										onClick={HandleBooking}
									>
										Book Now
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoomInfo;
