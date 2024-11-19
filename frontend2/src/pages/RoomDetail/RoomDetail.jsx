import React, { useState } from "react";
import room1 from "../img/room/room-1.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Booking_Modal from "../Room/Booking_Modal";

const RoomDetail = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const location = useLocation();
	const roomData = location.state;
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
								<h2>Our Rooms</h2>
								<div className="bt-option">
									<a href="./">Home</a>
									<span>Room Details</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section className="room-details-section spad">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="room-details-item">
								<img src={room1} alt="Room Details" />
								<div className="rd-text">
									<div className="rd-title">
										<h3>{roomData.RoomType}</h3>
										<div className="rdt-right">
											<div className="rating">
												<i className="icon_star"></i>
												<i className="icon_star"></i>
												<i className="icon_star"></i>
												<i className="icon_star"></i>
												<i className="icon_star-half_alt"></i>
											</div>
											{/* <a href="#">Booking Now</a> */}
										</div>
									</div>
									<h2>
										{roomData.Price}$<span>/Pernight</span>
									</h2>
									<table>
										<tbody>
											<tr>
												<td className="r-o">Size:</td>
												<td>30 ft</td>
											</tr>
											<tr>
												<td className="r-o">Capacity:</td>
												<td>Max person 3</td>
											</tr>
											<tr>
												<td className="r-o">Bed:</td>
												<td>King Beds</td>
											</tr>
											<tr>
												<td className="r-o">Services:</td>
												<td>{roomData.Features}</td>
											</tr>
										</tbody>
									</table>
									<p className="f-para">
										Motorhome or Trailer that is the question for you. Here are
										some of the advantages and disadvantages of both, so you
										will be confident when purchasing an RV. When comparing Rvs,
										a motorhome or a travel trailer, should you buy a motorhome
										or fifth wheeler? The advantages and disadvantages of both
										are studied so that you can make your choice wisely when
										purchasing an RV. Possessing a motorhome or fifth wheel is
										an achievement of a lifetime. It can be similar to
										sojourning with your residence as you search the various
										sites of our great land, America.
									</p>
									<p>
										The two commonly known recreational vehicle classes are the
										motorized and towable. Towable rvs are the travel trailers
										and the fifth wheel. The rv travel trailer or fifth wheel
										has the attraction of getting towed by a pickup or a car,
										thus giving the adaptability of possessing transportation
										for you when you are parked at your campsite.
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="room-booking">
								<h3>Your Reservation</h3>

								<div className="form-group">
									<label htmlFor="date-in">Check In:</label>
									<div className="input-group">
										<DatePicker
											selected={startDate}
											onChange={(date) => setStartDate(date)}
											selectsStart
											startDate={startDate}
											endDate={endDate}
											dateFormat="dd/MM/yyyy"
											className="form-control"
										/>
										<div className="input-group-append">
											<span className="input-group-text">
												<i className="fas fa-calendar"></i>
											</span>
										</div>
									</div>
								</div>

								<div className="form-group">
									<label htmlFor="date-in">Check Out:</label>
									<div className="input-group">
										<DatePicker
											selected={endDate}
											onChange={(date) => setEndDate(date)}
											selectsEnd
											startDate={endDate}
											endDate={startDate}
											dateFormat="dd/MM/yyyy"
											className="form-control"
										/>
										<div className="input-group-append">
											<span className="input-group-text">
												<i className="fas fa-calendar"></i>
											</span>
										</div>
									</div>
								</div>
								<button className="btn btn-primary" onClick={HandleBooking}>
									Check Now
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default RoomDetail;
