import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmModal from "./UserDeleteModal";
import EditUserModal from "./UserEditModal";
import AddUserModal from "./UserAddModal";
import {
	CreateNewUser,
	DeleteUser,
	EditUserService,
	GetAllUser,
} from "../../../services/userService";
import { toast } from "react-toastify";
import { GetBookingID } from "../../../services/apiService";

const ManageUsers = () => {
	const [users, setUsers] = useState([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(5);
	const fetchUser = async () => {
		let res = await GetAllUser();
		setUsers(res);
	};
	useEffect(() => {
		fetchUser();
	}, []);

	const handleDeleteClick = (user) => {
		setSelectedUser(user);
		setShowDeleteModal(true);
	};

	const handleEditClick = (user) => {
		setSelectedUser(user);
		setShowEditModal(true);
	};

	const handleAddNewUser = async (newUser) => {
		let res = await CreateNewUser(newUser);
		if (res && res.errCode === 0) {
			toast.success(res.message);
			await fetchUser();
		} else {
			toast.error("Error");
		}
	};
	const EditUserE = async (idUser, formvalue) => {
		let res = await EditUserService(idUser, formvalue);
		if (res && res.errCode === 0) {
			toast.success(res.message);
			await fetchUser();
		} else {
			toast.error("Error");
		}
	};
	const DeleteUserDel = async (idUser) => {
		let user = await GetBookingID(idUser);
		if (user && user.errCode === 0) {
			toast.error("The user currently has a booking");
		} else {
			let res = await DeleteUser(idUser);
			if (res && res.errCode === 0) {
				toast.success(res.message);
				await fetchUser();
			} else {
				toast.error("Error");
			}
		}
	};
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentBookings = users.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(users.length / itemsPerPage);

	return (
		<div className="container mt-4 mx-3 " style={{ width: "1000px" }}>
			<h2 className="mb-4 p-2 border-bottom">Manage Users</h2>

			<button
				className="btn btn-primary mb-2"
				onClick={() => setShowAddModal(true)}
			>
				Add New User
			</button>
			<table className="table table-bordered table-striped rounded">
				<thead className="thead-dark">
					<tr>
						<th>User ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Created At</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{users.length > 0 ? (
						users.map((user) => (
							<tr key={user.UserID}>
								<td>{user.UserID}</td>
								<td>{user.Name}</td>
								<td>{user.Email}</td>
								<td>{user.Phone}</td>
								<td>{user.CreatedAt}</td>
								<td>
									<button
										className="btn btn-warning btn-sm mr-2"
										onClick={() => handleEditClick(user)}
									>
										Edit
									</button>
									<button
										className="btn btn-danger btn-sm"
										onClick={() => handleDeleteClick(user)}
									>
										Delete
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="6" className="text-center">
								No users available.
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
				toggle={() => setShowDeleteModal(!showDeleteModal)}
				isOpen={showDeleteModal}
				user={selectedUser}
				onConfirm={DeleteUserDel}
			/>

			<EditUserModal
				toggle={() => setShowEditModal(!showEditModal)}
				isOpen={showEditModal}
				user={selectedUser}
				onSave={EditUserE}
			/>

			<AddUserModal
				toggle={() => setShowAddModal(!showAddModal)}
				isOpen={showAddModal}
				onSave={handleAddNewUser}
			/>
		</div>
	);
};

export default ManageUsers;
