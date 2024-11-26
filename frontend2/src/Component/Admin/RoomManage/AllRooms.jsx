import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmModal from "./RoomDeleteModal";
import EditRoomModal from "./RoomEditModal";
import {
	ChangeRoomAva,
	GetAllRooms,
	UpdateRoomStatusByBooking,
	DeleteRooms,
	GetBookingID_room,
} from "../../../services/apiService";
import { toast } from "react-toastify";

const AllRooms = () => {
	const [rooms, setRooms] = useState([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState(null);

	const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(5);
	const fetchRooms = async () => {
		let res = await GetAllRooms();
		setRooms(res);
	};
	useEffect(() => {
		fetchRooms();
	}, []);

	const handleSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });

		const sortedRooms = [...rooms].sort((a, b) => {
			if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
			if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
			return 0;
		});

		setRooms(sortedRooms);
	};

	const getSortIndicator = (key) => {
		if (sortConfig.key !== key) return null;
		return sortConfig.direction === "asc" ? "▲" : "▼";
	};

	const handleDeleteClick = (room) => {
		setSelectedRoom(room);
		setShowDeleteModal(true);
	};

	const handleEditClick = (room) => {
		setSelectedRoom(room);
		setShowEditModal(true);
	};

	const handleConfirmDelete = async (id_rooms) => {
		// setRooms((prevRooms) =>
		// 	prevRooms.filter((r) => r.RoomID !== selectedRoom.RoomID)
		// );
		// setSelectedRoom(null);
		let response = await GetBookingID_room(id_rooms);
		if (response && response.errCode === 0) {
			toast.error("Rooms is Booking");
		} else {
			let res = await DeleteRooms(id_rooms);
			if (res && res.errCode === 0) {
				toast.success(res.message);
				setShowDeleteModal(false);
				fetchRooms();
			}
		}
	};

	const handleSaveEdit = async (updatedRoom) => {
		let res = await ChangeRoomAva(updatedRoom);
		if (res && res.errCode === 0) {
			toast.success(res.message);
			setShowEditModal(false);
			fetchRooms();
		}
		// setRooms((prevRooms) =>
		// 	prevRooms.map((r) => (r.RoomID === updatedRoom.RoomID ? updatedRoom : r))
		// );
		// setSelectedRoom(null);
	};
	const handleUpdateRoomStatusClick = async () => {
		let res = await UpdateRoomStatusByBooking();
		if (res && res.errCode === 0) {
			toast.success(res.message);
			setShowEditModal(false);
			fetchRooms();
		}
	};

	const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);
	const toggleEditModal = () => setShowEditModal(!showEditModal);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentRooms = rooms.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(rooms.length / itemsPerPage);

	return (
		<div className="container mt-4 mx-3" style={{ width: "1000px" }}>
			<h2 className="mb-4 p-2 border-bottom">Manage Rooms</h2>
			<button
				className="btn btn-success mb-2"
				onClick={() => handleUpdateRoomStatusClick()}
			>
				Update Room Status
			</button>
			<table className="table table-bordered table-striped rounded">
				<thead className="thead-dark">
					<tr>
						<th
							onClick={() => handleSort("RoomID")}
							style={{ cursor: "pointer" }}
						>
							Room ID {getSortIndicator("RoomID")}
						</th>
						<th
							onClick={() => handleSort("RoomType")}
							style={{ cursor: "pointer" }}
						>
							Room Type {getSortIndicator("RoomType")}
						</th>
						<th
							onClick={() => handleSort("Price")}
							style={{ cursor: "pointer" }}
						>
							Price {getSortIndicator("Price")}
						</th>
						<th
							onClick={() => handleSort("Availability")}
							style={{ cursor: "pointer" }}
						>
							Availability {getSortIndicator("Availability")}
						</th>
						<th
							onClick={() => handleSort("Features")}
							style={{ cursor: "pointer" }}
						>
							Features {getSortIndicator("Features")}
						</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{rooms.length > 0 ? (
						currentRooms.map((room) => (
							<tr key={room.RoomID}>
								<td>{room.RoomID}</td>
								<td>{room.RoomType}</td>
								<td>${room.Price}</td>
								<td>
									<span
										className={`badge ${
											room.Availability === 0
												? "bg-success text-white"
												: "bg-danger text-white"
										}`}
									>
										{room.Availability === 0 ? "Available" : "Booked"}
									</span>
								</td>
								<td>{room.Features}</td>
								<td>
									<button
										className="btn btn-warning btn-sm mr-2"
										onClick={() => handleEditClick(room)}
									>
										Edit
									</button>
									<button
										className="btn btn-danger btn-sm"
										onClick={() => handleDeleteClick(room)}
									>
										Delete
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="6" className="text-center">
								No rooms available.
							</td>
						</tr>
					)}
				</tbody>
			</table>

			<nav>
				<ul className="pagination justify-content-end">
					<li
						className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					>
						<button className="page-link">Previous</button>
					</li>
					{Array.from({ length: totalPages }, (_, index) => (
						<li
							key={index + 1}
							className={`page-item ${
								currentPage === index + 1 ? "active" : ""
							}`}
							onClick={() => setCurrentPage(index + 1)}
						>
							<button className="page-link">{index + 1}</button>
						</li>
					))}
					<li
						className={`page-item ${
							currentPage === totalPages ? "disabled" : ""
						}`}
						onClick={() =>
							setCurrentPage((prev) => Math.min(prev + 1, totalPages))
						}
					>
						<button className="page-link">Next</button>
					</li>
				</ul>
			</nav>

			<DeleteConfirmModal
				toggle={toggleDeleteModal}
				isOpen={showDeleteModal}
				room={selectedRoom}
				onConfirm={handleConfirmDelete}
			/>

			<EditRoomModal
				toggle={toggleEditModal}
				isOpen={showEditModal}
				room={selectedRoom}
				onSave={handleSaveEdit}
			/>
		</div>
	);
};

export default AllRooms;
