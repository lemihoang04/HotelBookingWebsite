import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import room1 from "../img/room/room-1.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./room.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GetAllRooms } from "../../services/apiService";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { UserContext } from "../../Context/UserProvider";
import { toast } from "react-toastify";
const Room = () => {
	const history = useHistory();
	const [rooms, setRooms] = useState([]);
	const GetDataRooms = async () => {
		let response = await GetAllRooms();
		const sortedRooms = response.sort(
			(a, b) => a.Availability - b.Availability
		);
		setRooms(sortedRooms);
	};

	const { formValues } = useContext(UserContext);
	useEffect(() => {
		GetDataRooms();
	}, []);
	const HandleClick = (data) => {
		if (data.Availability == 1) {
			history.push(`/rooms/id_room=${data.RoomID}`, data);
		} else {
			toast.error("Room has Booked");
		}
	};
	return (
		<>
			<div className="breadcrumb-section">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="breadcrumb-text">
								<h2>Our Rooms</h2>
								<div className="bt-option">
									<a href="./">Home</a>
									<span>Rooms</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Breadcrumb Section End */}

			{/* Rooms Section Begin */}
			<section className="rooms-section spad">
				<div className="container">
					<div className="row">
						{rooms &&
							rooms.length > 0 &&
							rooms.map((item, index) => {
								const isBooked = item.Availability == 0; // Kiểm tra trạng thái
								return (
									<div
										className={`col-lg-4 col-md-6 mb-4 d-flex align-items-stretch`}
										key={index}
									>
										<div className={`room-item ${isBooked ? "booked" : ""}`}>
										<img src={`http://127.0.0.1:5000/load/${item.Image}`} alt="" />
											{isBooked && <div className="booked-overlay">Booked</div>}
											<div className="ri-text">
												<h4>{item.RoomType}</h4>
												<h3>
													{item.Price}$<span>/Pernight</span>
												</h3>
												{!isBooked ? (
													<button
														type="button"
														onClick={() => HandleClick(item)}
														className="btn btn-primary"
													>
														More Details
													</button>
												) : (
													<button className="btn btn-secondary" disabled>
														Unavailable
													</button>
												)}
											</div>
										</div>
									</div>
								);
							})}

						{/* Add other room items similarly */}
						<div className="col-lg-4 col-md-6">
							<div className="room-item">
								<img src={room1} alt="" />
								<div className="ri-text">
									<h4>Deluxe Room</h4>
									<h3>
										159$<span>/Pernight</span>
									</h3>
									<table>
										<tbody>
											<tr>
												<td className="r-o">Size:</td>
												<td>30 ft</td>
											</tr>
											<tr>
												<td className="r-o">Capacity:</td>
												<td>Max person 5</td>
											</tr>
											<tr>
												<td className="r-o">Bed:</td>
												<td>King Beds</td>
											</tr>
											<tr>
												<td className="r-o">Services:</td>
												<td>Wifi, Television, Bathroom,...</td>
											</tr>
										</tbody>
									</table>
									<Link to={`/rooms/id_room=1`} className="primary-btn">
										More Details
									</Link>
								</div>
							</div>
						</div>

						{/* Tiếp tục các mục phòng khác tương tự */}

						<div className="col-lg-12">
							<nav aria-label="Room page navigation">
								<ul className="pagination justify-content-center">
									<li className="page-item">
										<a className="page-link" href="#">
											1
										</a>
									</li>
									<li className="page-item">
										<a className="page-link" href="#">
											2
										</a>
									</li>
									<li className="page-item">
										<a className="page-link" href="#">
											Next <i className="fa fa-long-arrow-right"></i>
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Room;
